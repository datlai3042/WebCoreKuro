/* eslint-disable @typescript-eslint/no-explicit-any */
import AuthService from "@/app/services/authentication";
import { ResponseAuth } from "@/app/services/authentication/auth.service.type";
import { isRedirectError, RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import storage from "../Helpers/LocalStorage.helper";
import { API_SYNC_TOKEN, OK } from "./http.constant";
import { RequestCustome, RequestMethod, RequestRetryParams, ResponseInstance } from "./http.type";
import { generateInfoRequest } from "./http.utils";
import { ResloveClientError } from "./useCaseClient";
import { ResloveServerError } from "./useCaseServer";

export const request = async <TResponse>(method: RequestMethod, url: string, options: RequestCustome = {}, httpInstance: typeof Http) => {
    const { baseHeader, body, fullUrl } = generateInfoRequest(url, options)
    const optionsRequest: RequestInit = {
        ...options,
        headers: {
            ...baseHeader,
            ...options?.headers,
        } as any,
        body,
        method,
        credentials: "include",
    };
    let response: Response = {} as Response
    try {

        response = await fetch(fullUrl, optionsRequest)
    } catch (e: unknown) {
        console.log({ error: e, scope: 'http' })
        try {
            if (typeof window === 'undefined') {
                redirect('/', RedirectType.push) // this will throw error

            } else {
                return { ok: false, code: false, metadata: {} } as unknown as TResponse
            }

        } catch (error) {
            if (isRedirectError(error)) { // Redirect error handle here
                return { ok: false, code: false, metadata: {} } as unknown as TResponse

            } else {
                console.log('other error')
                return { ok: false, code: false, metadata: {} } as unknown as TResponse

            }
        }


    }



    if (!response.ok || !response) {
        if (typeof window !== "undefined") {
            const props: RequestRetryParams = {
                fullUrl, options: optionsRequest, response, statusCode: response.status, url, httpInstance, method
            }
            await ResloveClientError<Response>(props);
        } else {
            await ResloveServerError(+response.status, options as RequestCustome);
        }
        return {} as TResponse
    }
    const contentType = response.headers.get('Content-Type');
    console.log({contentType})
    if (contentType && contentType.includes('application/json')) {
        const payload = await response.json();
        if (API_SYNC_TOKEN.includes(url)) {
            const { code, metadata } = payload as ResponseInstance<ResponseAuth>
            if (+code === OK) {
                const { client_id, token, expireCookie, expireToken } = metadata
                const { access_token, refresh_token } = token

                storage.setItem('expire_token', expireToken)
                storage.setItem('expire_time', expireCookie)

                await AuthService.syncNextToken({ access_token, refresh_token, client_id })
            }
        }
        return payload

    }
    if (contentType && contentType.includes('application/octet-stream')) {
        const payload = await response.blob() as TResponse
        return payload
    }





}


export class Http {
    static queue_faild: RequestRetryParams[] = []
    static isPendingRefreshToken = false
    static get<TResponse>(url: string, options: Omit<RequestCustome, "body">) {
        const method: RequestMethod = 'GET'
        return request<ResponseInstance<TResponse>>(method, url, options, Http,)
    }

    static post<TResponse>(url: string, body: any, options: Omit<RequestCustome, "body"> = {}) {
        const method: RequestMethod = 'POST'
        console.log({ url })
        return request<ResponseInstance<TResponse>>(method, url, { ...options, body }, Http,)
    }

    static put<TResponse>(url: string, body: any, options: Omit<RequestCustome, 'body'> = {}) {
        const method: RequestMethod = 'PUT'
        return request<ResponseInstance<TResponse>>(method, url, { ...options, body }, Http,)
    }

    static delete<TResponse>(url: string, options: Omit<RequestCustome, 'body'> = {}) {
        const method: RequestMethod = 'DELETE'
        return request<ResponseInstance<TResponse>>(method, url, options, Http,)
    }

    static clearInstanceCache() {
        Http.isPendingRefreshToken = false
        Http.queue_faild = []
    }

}

const http = {
    get: Http.get,
    post: Http.post,
    put: Http.put,
    delete: Http.delete,
}


export default http