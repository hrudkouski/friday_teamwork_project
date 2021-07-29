import axios from "axios";
import { ProfileType } from "../../n2-features/f1-auth/a1-login/login-reducer";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

// Types
// export type ProfileType = {
//     created: string
//     email: string
//     isAdmin: string
//     name: string
//     publicCardPacksCount: number
//     rememberMe: boolean
//     token: string
//     tokenDeathTime: string
//     updated: string
//     verified: string
//     __v: number
//     _id: string
// } 

// Api
export const recoveryPasswordApi = {
    passwordRecovery(email: string, from: string, message: {}) {
        return instance.post(`auth/forgot`, {email, from, message})
    },
    newPassword(password: string, resetPasswordToken: {}) {
        return instance.post(`auth/set-new-password`, {password, resetPasswordToken})
    }
}

export const loginApi = {
    login(user: ProfileType) {
        return instance.post(`auth/login/`, {email: user.email, password: user.password, rememberMe: user.rememberMe})
    }
}

export const registerApi = {
    registerUser(email: string, password: string) {
        return instance.post<any>('auth/register', {
            email, password
        })
    },
}

