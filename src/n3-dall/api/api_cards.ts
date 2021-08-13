import axios from "axios";
import {EntityStatusType} from "../../n1-main/m1-ui/u2-components/Packs/packs-reducer";
import {ProfileResponseType} from "../../n2-features/f1-auth/a1-login/login-reducer";

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
        return instance.post<ProfileResponseType>(`auth/login`, {email, password, rememberMe})
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

export const packsApi = {
    getPacks(pageCount: number = 7, page: number = 1, packName: string = '', min: number, max: number, id: string) {
        return instance.get<ResponseDataType>(`/cards/pack/?packName=${packName}&pageCount=${pageCount}&page=${page}&sortPacks=&min=${min}&max=${max}&user_id=${id}`)
    },
    createPacks(title: string) {
        return instance.post(`cards/pack`, {
            cardsPack: {
                name: title
            }
        })
    },
    deletePacks(id: string) {
        return instance.delete<CardPacksDataType>(`cards/pack?id=${id}`)
    },
    updatePacks(_id: string, name: string) {
        return instance.put(`cards/pack`, {
            cardsPack: {
                _id,
                name
            }
        })
    }
}

export const cardsApi = {
    getCards(cardsPack_id: string, page: number = 1, pageCount: number = 10,) {
        return instance.get<CardsResponseDataType>
        (`cards/card?cardsPack_id=${cardsPack_id}&pageCount=${pageCount}&page=${page}`)
    },
    createCard(newCard: NewCardType) {
        return instance.post(`cards/card`, {
            card: newCard
        })
    },
    deleteCard(cardsPack_id: string) {
        return instance.delete(`cards/card?id=${cardsPack_id}`)
    },
}

// Types
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
// export type PacksResponseDataType = {
//     cardPacks: Array<CardPacksDataType>
//     cardPacksTotalCount: number
//     maxCardsCount: number
//     minCardsCount: number
//     page: number
//     pageCount: number
// }
export type CardsResponseDataType = {
    cards: Array<CardDataType>,
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}
export type CardDataType = {
    answer: string
    answerImg: string
    answerVideo: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    questionImg: string
    questionVideo: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}
export type NewCardType = {
    cardsPack_id: string
    question?: string
    answer?: string
}
export type ResponseDataType = {
    cardPacks: Array<CardPacksDataType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}

