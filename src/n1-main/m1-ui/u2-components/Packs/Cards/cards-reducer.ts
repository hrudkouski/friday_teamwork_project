import {AppThunkType} from "../../../../m2-bll/store/redux-store";
import {changeStatusAC} from "../../../u1-app/app-reducer";
import {cardsApi} from "../../../../../n3-dall/api/api_cards";
import {toast} from "react-hot-toast";

// Actions
const SET_CARDS = 'friday_teamwork_project/cards-reducer/SET_CARDS';
const SET_PACKS_TOTAL_COUNT = 'friday_teamwork_project/cards-reducer/SET_PACKS_TOTAL_COUNT';

// Types
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
export type InitialStateType = {
    cards: Array<CardDataType>,
    packUserId: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
    activeModal: boolean
}
export type CardsActionsType =
    | ReturnType<typeof setCardsAC>

// Initial State
const initialState: InitialStateType = {
    cards: [],
    packUserId: '',
    page: 1,
    pageCount: 4,
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 6,
    token: "0cd8eb10-f929-11eb-9fdc-dd4ff732a1d6",
    tokenDeathTime: 1628534826945,
    activeModal: false,
}

// Reducer
export const cardsReducer = (state: InitialStateType = initialState, action: CardsActionsType): InitialStateType => {
    switch (action.type) {
        case SET_CARDS: {
            return {
                ...state,
                cards: action.cards
            };
        }
        default:
            return state;
    }
}

// Actions Creators
export const setCardsAC = (cards: any) => ({type: SET_CARDS, cards} as const)
export const setCardsTotalCountAC = (count: number) => ({type: SET_PACKS_TOTAL_COUNT, count} as const)

// Thunk Creators
export const getCards = (id: string): AppThunkType =>
    (dispatch) => {
        dispatch(changeStatusAC("loading"))
        cardsApi.getCards(id)
            .then(response => {
                dispatch(setCardsAC(response.data.cards))
                dispatch(changeStatusAC("succeeded"))
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(changeStatusAC("failed"))
                toast.error(error)
            })
            .finally(() => {
                dispatch(changeStatusAC('succeeded'))
            })
    }

