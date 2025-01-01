import { Account } from "@/type";

export type TLoginBody = {
    username: string,
    password: string
}

export type TRegisterBody = {
    username: string,
    password: string
}
export type ResponseAuth = {
	user: Account.TUser;
	token: {
		access_token: string;
		refresh_token: string;
	};
	client_id: string;
	expireToken: string;
	expireCookie: string;
};

