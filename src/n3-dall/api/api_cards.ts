import axios from "axios";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    withCredentials: true,
})

// Types

// Api
export const loginApi = {}
export const registerApi = {}
export const recoveryPasswordApi = {
    passwordRecovery(email: string, from: string, message: {}) {
        return instance.post(`/auth/forgot`, {email, from, message})
    }
}