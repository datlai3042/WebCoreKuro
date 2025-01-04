import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { RequestCustome } from "./http.type";
import { FETCH_FAILED } from "./http.constant";

export const generateInfoRequest = (url: string, options: RequestCustome) => {
    const body = options?.body ? (options.body instanceof FormData ? options.body : JSON.stringify(options.body)) : undefined;
    const baseHeader =
        options?.body instanceof FormData
            ? {}
            : {
                "Content-Type": "application/json",
            };

    let baseUrl = "http://localhost:4001";
    if (options?.baseUrl === undefined) {
        //   if (process.env.NEXT_PUBLIC_MODE === "DEV") {
                baseUrl = "http://localhost:4001";
        //   } else {
                // baseUrl = process.env.NEXT_PUBLIC_BACK_END_URL;
        //   }
    } else {
        //   if (process.env.NEXT_PUBLIC_MODE === "DEV") {
                baseUrl = "http://localhost:3000";
        //   } else {
                // baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
        //   }
    }

    const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

    return { body, baseHeader, baseUrl, fullUrl };
};


export const generateCookiesNextServer = (cookieInstance: ReadonlyRequestCookies) => {
    const client_id = cookieInstance.get('next_client_id')?.value
    const access_token = cookieInstance.get('next_access_token')?.value
    const refresh_token = cookieInstance.get('next_refresh_token')?.value
    const headers =
        `client_id=${client_id};access_token=${access_token};refresh_token=${refresh_token}`
        console.log({headers})
    return headers
}


export const generateMessageError =  (error: Error) => {
    let message = 'Lỗi không xác định'
    if(error?.message === FETCH_FAILED.type) {
        message = FETCH_FAILED.message
        console.log({message})
        return message 
    }
    console.log({message, error})

    return message
}




