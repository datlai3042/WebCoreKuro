/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestCustome, RequestMethod, RequestRetryParams } from "./http.type";
import { generateInfoRequest } from "./http.utils";
import { ResloveClientError } from "./useCaseClient";

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
    const response = await fetch(fullUrl, optionsRequest)
    if (!response.ok) {
        if (typeof window !== "undefined") {
            const props: RequestRetryParams = {
                fullUrl, options: optionsRequest, response, statusCode: response.status, url, httpInstance, method
            }
            const result = await ResloveClientError<Response>(props);
            return result;
        } else {
            // return await httpCaseErrorNextServer(+response.status, options as CustomRequest);
        }
    }


    const payload: TResponse = await response.json()

    return payload


}


export class Http {
    static queue_faild: RequestRetryParams[] = []
    static isPendingRefreshToken = false
    static get<TResponse>(url: string, options: Omit<RequestCustome, "body">) {
        const method: RequestMethod = 'GET'
        return request<TResponse>(method, url, options, Http,)
    }

    static post<TResponse>(url: string, body: any, options: Omit<RequestCustome, "body"> = {}) {
        const method: RequestMethod = 'POST'
        return request<TResponse>(method, url, { ...options, body }, Http,)
    }

    static put<TResponse>(url: string, body: any, options: Omit<RequestCustome, 'body'> = {}) {
        const method: RequestMethod = 'PUT'
        return request<TResponse>(method, url, { ...options, body }, Http,)
    }

    static delete<TResponse>(url: string, options: Omit<RequestCustome, 'body'> = {}) {
        const method: RequestMethod = 'DELETE'
        return request<TResponse>(method, url, options, Http,)
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