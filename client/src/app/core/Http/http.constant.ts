import { LOGIN_URL, REFRESH_TOKEN_URL, REGISTER_URL } from "@/app/services/authentication/auth.constant";

export const AUTHORIZATION_ERROR_STATUS = 401;
export const PERMISSION_ERROR_STATUS = 403;
export const NOTFOUND_ERROR_STATUS = 404;
export const BADREQUEST_ERROR_STATUS = 400;
export const OK = 200


export const API_SYNC_TOKEN = [LOGIN_URL, REGISTER_URL, REFRESH_TOKEN_URL]


export const FETCH_FAILED =  {
    type: 'Failed to fetch',
    message: 'Tìm dữ liệu thất bại'
}