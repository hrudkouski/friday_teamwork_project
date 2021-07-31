import axios from "axios";
import {ProfileType} from "../../n2-features/f1-auth/a1-login/login-reducer";

const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

// Api
export const recoveryPasswordApi = {
    passwordRecovery(email: string, from: string, message: {}) {
        return instance.post(`auth/forgot`, {
            email, from, message
        })
    },
    newPassword(password: string, resetPasswordToken: {}) {
        return instance.post(`auth/set-new-password`, {
            password, resetPasswordToken
        })
    }
}

export const loginApi = {
    login(user: ProfileType) {
        return instance.post(`auth/login/`, {
            email: user.email,
            password: user.password,
            rememberMe: user.rememberMe
        })
    },
    logOut() {
        return instance.delete('auth/me')
    },
}

export const registerApi = {
    registerUser(email: string, password: string) {
        return instance.post('auth/register', {
            email, password
        })
    },
}

