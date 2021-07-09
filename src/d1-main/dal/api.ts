import {instance} from "./base-url";


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
