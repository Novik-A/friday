import axios from 'axios'
import {baseURL} from "./base-url";


const instance = axios.create({
    baseURL,
    withCredentials: true
})

// api
export const authAPI = {
    me() {
        return instance.post(`auth/me`, {})
    },
    login() {
        return instance.post(`auth`)
    },
    logout() {
        return instance.delete(`auth`)
    }
}

// types
