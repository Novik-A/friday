import {instance} from "./base-url";

// api
export const registerAPI = {
    register(data: RegisterParamsType) {
        return instance.post<ResponseRegisterType>(`auth/register`, data)
    },
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

