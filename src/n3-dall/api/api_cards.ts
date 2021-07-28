import axios from "axios";
import { ProfileType } from "../../n2-features/f1-auth/a1-login/login-reducer";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
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
export const loginApi = {
    
    login(user: ProfileType) {
        
        const promise = instance.post(`/auth/login/`, {email: user.email, password: user.password, rememberMe: user.rememberMe})
        return promise;
    }
}
export const registerApi = {}
export const recoveryPasswordApi = {}