import AuthService from "@/app/services/authentication"
import { ResponseAuth } from "@/app/services/authentication/auth.service.type"
import { request } from "."
import { AUTHORIZATION_ERROR_STATUS, OK, PERMISSION_ERROR_STATUS } from "./http.constant"
import { RequestRetryParams, ResponseInstance } from "./http.type"
import elementDom from "../Helpers/ElementDOM"

export const ResloveClientError = async <TResponse>(
    args: RequestRetryParams
) => {
    const { statusCode } = args
    switch (+statusCode) {
        case AUTHORIZATION_ERROR_STATUS: {
            return Client401<TResponse>(args)
        }

        case PERMISSION_ERROR_STATUS: {
            return Client403(args)
        }
        default: {
            elementDom.createElementAlert({ title: 'Lỗi nội bộ', buttonText: 'Đăng xuất', callback: () => AuthService.logout() })
        }
    }
}
let refreshTokenPromise: Promise<ResponseInstance<ResponseAuth>> | null = null;

const Client401 = async <TResponse>(args: RequestRetryParams) => {
    const { httpInstance, method, options, url } = args
    if (!refreshTokenPromise) {
        httpInstance.isPendingRefreshToken = true
        refreshTokenPromise = AuthService.refreshTokenClient().finally(() => (refreshTokenPromise = null));
    }

    if (httpInstance.isPendingRefreshToken) {
        httpInstance.queue_faild.push(args)
    }

    return refreshTokenPromise?.then(async (res) => {
        if (+res.code === PERMISSION_ERROR_STATUS) {
            await AuthService.logout();
        }
        if (+res.code === OK) {
            const { client_id, token } = res.metadata
            const { access_token, refresh_token } = token
            AuthService.syncNextToken({ access_token, client_id, refresh_token }).then(() => {
                const retry_request = request<TResponse>(method, url, options, httpInstance)
                if (httpInstance?.queue_faild.length > 0) {
                    const resloveQueue = httpInstance.queue_faild.map((request_faild) => {
                        const { httpInstance, options, url, method } = request_faild
                        return request(method, url, options, httpInstance)
                    })
                    Promise.all([retry_request, resloveQueue,])
                        .then(() => httpInstance.clearInstanceCache())
                        .catch(() => AuthService.logout())
                        .finally(() => httpInstance.clearInstanceCache())
                }
            }).catch(() => AuthService.logout())


        }

    })
}

const Client403 = (args: RequestRetryParams) => {
    const { httpInstance } = args
    if (httpInstance.queue_faild.length > 0) {
        httpInstance.queue_faild = []
    }
    return AuthService.logout()
}