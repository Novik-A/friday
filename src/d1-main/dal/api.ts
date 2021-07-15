import {instance} from "./base-url";


// api
export const authAPI = {
    register(data: RegisterParamsType) {
        return instance.post<ResponseRegisterType>(`auth/register`, data)
    },
    login(data: LoginParamsType) {
        return instance.post<ResponseLoginType>(`auth/login`, data)
    },
    me() {
        return instance.post<ResponseLoginType>(`auth/me`, {})
    },
    changeData(userData: UserDataParamsType) {
        return instance.put('auth/me', userData)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/me`)
    }
}

export const forgotAPI = {
    forgot(data: ForgotParamsType) {
        return instance.post<ResponseForgotType>(`auth/forgot`, data)
    },
    setPass(data: SetPassParamsType) {
        return instance.post<ResponseForgotType>(`auth/set-new-password`, data)
    }
}


// types
export type RegisterParamsType = {
    email: string
    password: string
}
export type ResponseRegisterType = {
    addUser: any
    error?: string
}
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
export type UserDataParamsType = {
    name?: string
    avatar?: string
}
type ResponseType = {
    info: string
    error?: string
}
export type ForgotParamsType = {
    email: string
    from: string
    message: string
}
export type SetPassParamsType = {
    password: string
    resetPasswordToken: string
}

export type ResponseForgotType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
} | {
    email: string
    emailRegExp: {}
    error: string
    in: string
}

