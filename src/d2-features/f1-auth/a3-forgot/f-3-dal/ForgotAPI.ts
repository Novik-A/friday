import { instance } from "../../../../d1-main/dal/base-url";


export const ForgotAPI = {
    forgot(data: ForgotParamsType) {
        return instance.post<ResponseForgotType | ErrorForgotType>(`auth/forgot`, data)
    },
    setPass(data: SetPassParamsType) {
        return instance.post<ResponseSetPassType | ErrorSetPassType>(`auth/set-new-password`, data)
    }
};


// types
export type ForgotParamsType = {
    email: string
    from: string
    message: string
}
export type ResponseForgotType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}
export type ErrorForgotType = {
    email: string
    emailRegExp: {}
    error: string
    in: string
}
export type SetPassParamsType = {
    password: string
    resetPasswordToken: string
}
export type ResponseSetPassType = {
    answer: boolean
    html: boolean
    info: string
    success: boolean
}
export type ErrorSetPassType = {
    email: string
    emailRegExp: {}
    error: string
    in: string
}