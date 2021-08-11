import {AppThunkType} from "../../../../m2-bll/store/redux-store";
import {changeStatusAC} from "../../../u1-app/app-reducer";
import {cardsApi, CardsResponseDataType, NewCardType} from "../../../../../n3-dall/api/api_cards";
import {toast} from "react-hot-toast";
import {setPackCardsIdAC} from "../packs-reducer";

// Actions
const SET_CARDS = 'friday_teamwork_project/cards-reducer/SET_CARDS';
const SET_PACKS_TOTAL_COUNT = 'friday_teamwork_project/cards-reducer/SET_PACKS_TOTAL_COUNT';

// Types
export type InitialStateType = CardsResponseDataType & {
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
    token: '',
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
export const getCards = (cardsPack_id: string): AppThunkType =>
    (dispatch) => {
        dispatch(changeStatusAC("loading"))
        cardsApi.getCards(cardsPack_id)
            .then(response => {
                dispatch(setCardsAC(response.data.cards))
                dispatch(setPackCardsIdAC(cardsPack_id))
                dispatch(changeStatusAC("succeeded"))
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(changeStatusAC("failed"))
                toast.error(error, {
                    duration: 2000
                })
            })
            .finally(() => {
                dispatch(changeStatusAC('succeeded'))
            })
    }

export const createCard = (cardsPack_id: string, question: string, answer: string): AppThunkType =>
    (dispatch) => {
        dispatch(changeStatusAC("loading"))
        const newCard: NewCardType = {cardsPack_id, question, answer}
        cardsApi.createCards(newCard)
            .then(() => {
                dispatch(getCards(cardsPack_id))
                dispatch(changeStatusAC("succeeded"))
            })
            .catch((e) => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(changeStatusAC("failed"))
                toast.error(error, {
                    duration: 2000
                })
            })
    }

