import {instance} from "./base-url";


// api
export const loginAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseLoginType>(`auth/login`, data)
    },
    me() {
        return instance.post<ResponseLoginType>(`auth/me`, {})
    },
    logout() {
        return instance.delete<ResponseType>(`auth/me`)
    }
}


// types
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}
export type ResponseLoginType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}
type ResponseType = {
    info: string
    error: string
}

