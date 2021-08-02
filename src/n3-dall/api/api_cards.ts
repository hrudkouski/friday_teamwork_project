import axios from "axios";
import {ProfileType} from "../../n2-features/f1-auth/a1-login/login-reducer";
import {EntityStatusType} from "../../n1-main/m1-ui/u2-components/Packs/packs-reducer";

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
        return instance.post(`auth/login`, {
            email: user.email,
            password: user.password,
            rememberMe: user.rememberMe
        })
    },
    logOut() {
        return instance.delete('auth/me')
    },
    // authMe() {
    //     return instance.post('auth/login')
    // }
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
    },
    updatePacks(_id: string, name: string) {
        return instance.put(`/cards/pack`, {
            cardsPack: {
                _id,
                name
            }
        })
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

