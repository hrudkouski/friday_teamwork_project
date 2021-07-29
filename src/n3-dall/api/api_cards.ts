import axios from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

// Types

// Api
export const loginApi = {}
export const registerApi = {
    registerUser(email: string, password: string) {
        return instance.post<any>('/auth/register', {
            email, password
        })
    },
}
export const recoveryPasswordApi = {}