import { RequestCustome } from "./http.type";

export const generateInfoRequest = (url: string, options: RequestCustome) => {
    const body = options?.body ? (options.body instanceof FormData ? options.body : JSON.stringify(options.body)) : undefined;
    const baseHeader =
        options?.body instanceof FormData
            ? {}
            : {
                "Content-Type": "application/json",
            };

    const baseUrl = "http://localhost:4000";
    // if (options?.baseUrl === undefined) {
    //       if (process.env.NEXT_PUBLIC_MODE === "DEV") {
    //             baseUrl = "http://localhost:4000";
    //       } else {
    //             baseUrl = process.env.NEXT_PUBLIC_BACK_END_URL;
    //       }
    // } else {
    //       if (process.env.NEXT_PUBLIC_MODE === "DEV") {
    //             baseUrl = "http://localhost:3000";
    //       } else {
    //             baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
    //       }
    // }

    const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

    return { body, baseHeader, baseUrl, fullUrl };
};