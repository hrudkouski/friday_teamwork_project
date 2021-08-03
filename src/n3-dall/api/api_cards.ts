import axios from "axios";
import {EntityStatusType} from "../../n1-main/m1-ui/u2-components/Packs/packs-reducer";
import { ProfileResponseType } from "../../n2-features/f1-auth/a1-login/login-reducer";

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
    
    authMe() {
        return instance.post<ProfileResponseType>('auth/me')
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<ProfileResponseType>(`auth/login`, { email, password, rememberMe })
    },
    logOut() {
        return instance.delete('auth/me')
    }
}

export const registerApi = {
    registerUser(email: string, password: string) {
        return instance.post('auth/register', {
            email, password
        })
    },
}

export const cardsApi = {
    getPacks() {
        return instance.get<ResponseDataType>(`/cards/pack`)
    },
    createPacks(title: string) {
        return instance.post(`/cards/pack`, {
            cardsPack: {
                name: title
            }
        })
    },
    deletePacks(id: string) {
        return instance.delete<CardPacksDataType>(`/cards/pack?id=${id}`)
    }
}

export type CardPacksDataType = {
    _id: string
    user_id: string
    user_name: string
    name: string
    cardsCount: number
    created: string
    updated: Date
    entityStatus: EntityStatusType
}

export type ResponseDataType = {
    cardPacks: Array<CardPacksDataType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

