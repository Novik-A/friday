import axios from 'axios'


const instance = axios.create({
    baseURL: `http://localhost:7542/2.0/`
})

// api
export const loginAPI = {
    login(data: LoginParamsType) {
        return instance.post<ResponseLoginType>(`auth/login`, data)
    },
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

