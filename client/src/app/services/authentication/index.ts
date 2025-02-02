import http from "@/app/core/Http";
import { ResponseInstance } from "@/app/core/Http/http.type";
import AUTH_CONSTANT from "./auth.constant";
import { ResponseAuth, TLoginBody, TRegisterBody } from "./auth.service.type";
import storage from "@/app/core/Helpers/LocalStorage.helper";

class AuthService {
    static login<TResponse>(args: TLoginBody) {
        return http.post<TResponse>(AUTH_CONSTANT.LOGIN_URL, args)
    }


    static register<TResponse>(args: TRegisterBody) {
        return http.post<TResponse>(AUTH_CONSTANT.REGISTER_URL, args)
    }
    static async logout() {
        console.trace()
        const urlRequestBackEnd = AUTH_CONSTANT.LOGOUT_URL;
        const urlRequestNextServer = AUTH_CONSTANT.REQUEST_NEXT_LOGOUT;
        const options = { baseUrl: "" };
        try {
            await http.post<{ message: string }>(urlRequestBackEnd, { force: true }, {});
            await http.post<{ message: string }>(urlRequestNextServer, {}, options);

            if (typeof window !== "undefined") {
                // return (window.location.href = "/login");
            }
        } catch (e: unknown) {
            await http.post<{ message: string }>(urlRequestNextServer, {}, options);
            if (typeof window !== "undefined") {
                // removeValueLocalStorage("expireToken");
                // removeValueLocalStorage("code_verify_token");

                // return window.location.href = "/login?token_expire=true"
            }
        }
        storage.removeItem('expire_token')
        storage.removeItem('expire_time')

        return null;
    }


    static async refreshTokenClient() {


        // const urlRequest = process.env.NEXT_PUBLIC_MODE === "DEV" ? "http://localhost:4000" : process.env.BACK_END_URL;
        const callRefreshToken = await http.get<ResponseAuth>(AUTH_CONSTANT.REFRESH_TOKEN_URL, {})
        return callRefreshToken;
    }

    static async syncNextToken({
        access_token,
        refresh_token,
        client_id,

    }: {
        access_token: string;
        refresh_token: string;
        client_id: string;
    }) {
        const bodySyncTokenAPI = {
            access_token,
            refresh_token,
            client_id,
        };

        // const urlRequest = process.env.NEXT_PUBLIC_MODE === "DEV" ? "http://localhost:3000" : process.env.CLIENT_URL;
        const urlRequest = 'http://localhost:3000'
        await fetch(`${urlRequest}/v1/api/authentication/sync-token`, {
            body: JSON.stringify(bodySyncTokenAPI),
            method: "POST",
        });
    }

    static async getNewTokenSync() {
        return http.get<ResponseAuth>(AUTH_CONSTANT.REFRESH_TOKEN_URL, {}).then(async (res) => {
            if (!res) {
                return AuthService.logout()
            }
            const { code, metadata } = res
            if (+code === 200) {

                const { client_id, token: { access_token, refresh_token } } = metadata
                const bodySyncTokenAPI = {
                    access_token,
                    refresh_token,
                    client_id,
                };
                const urlRequest = 'http://localhost:3000'
                await fetch(`${urlRequest}/v1/api/authentication/sync-token`, {
                    body: JSON.stringify(bodySyncTokenAPI),
                    method: "POST",
                });

            }

        })

    }

    // static async tokenExpireRedrict(options: RequestCustome) {
    //     const pathName = options?.pathName;
    //     const cookies = (options?.headers as any)["Cookie"];

    //     const code_verify_token = getCookieValueHeader("code_verify_token", cookies);

    //     return redirect(`/v1/api/token/refresh-token?code_verify_token=${code_verify_token}&pathName=${pathName}`);
    // }

    // static async tokenPermission(statusCode: number, payload: ErrorPayload) {
    //     const payloadError: ConstructorError = {
    //         status: +statusCode,
    //         payload: payload as ErrorPayload,
    //     };
    //     throw new PermissionError(payloadError);
    // }


}


export default AuthService