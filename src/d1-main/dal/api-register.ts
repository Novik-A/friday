import axios from 'axios'


const instance = axios.create({
    baseURL: `http://localhost:7542/2.0/`
})

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

