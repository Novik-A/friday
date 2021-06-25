import axios from 'axios'


const instance = axios.create({
    baseURL: `https://neko-cafe-back.herokuapp.com/`
})

// api
export const authAPI = {
    me() {
        return instance.get(`auth`)
    },
    login() {
        return instance.post(`auth`)
    },
    logout() {
        return instance.delete(`auth`)
    }
}

// types
