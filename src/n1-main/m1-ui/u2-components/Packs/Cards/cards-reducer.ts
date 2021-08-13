import {AppThunkType} from "../../../../m2-bll/store/redux-store";
import {changeStatusAC} from "../../../u1-app/app-reducer";
import {cardsApi, CardsResponseDataType, learnApi, NewCardType} from "../../../../../n3-dall/api/api_cards";
import {toast} from "react-hot-toast";
import {setPackCardsIdAC} from "../packs-reducer";

// Actions
const SET_CARDS = 'friday_teamwork_project/cards-reducer/SET_CARDS';
const SET_PACKS_TOTAL_COUNT = 'friday_teamwork_project/cards-reducer/SET_PACKS_TOTAL_COUNT';
const SET_UPDATE_GRADE_CARD = 'friday_teamwork_project/cards-reducer/SET_UPDATE_GRADE_CARD';

// Types
export type InitialStateType = CardsResponseDataType & {
    activeModal: boolean
}
export type CardsActionsType =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setUpdateGradeCardAC>

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
        case SET_UPDATE_GRADE_CARD: {
            return {...state,
                cards: state.cards.map(c => c._id === action.card_id ? {...c, grade: action.grade} : c)}
        }
        default:
            return state;
    }
}

// Actions Creators
export const setCardsAC = (cards: any) => ({type: SET_CARDS, cards} as const)
export const setCardsTotalCountAC = (count: number) => ({type: SET_PACKS_TOTAL_COUNT, count} as const)
export const setUpdateGradeCardAC = (grade: number, card_id: string) => ({type: SET_UPDATE_GRADE_CARD, grade, card_id} as const)

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

export const updateGrade = (grade: number, card_id: string): AppThunkType =>
    (dispatch) => {
        dispatch(changeStatusAC("loading"))
        learnApi.learnCard(grade, card_id)
            .then (res => {
                dispatch(setUpdateGradeCardAC(res.data.grade, res.data.card_id))
                dispatch(changeStatusAC("succeeded"))
            })
            .catch(e => {
                const error = e.response
                    ? e.response.data.error
                    : (e.message + ', more details in the console');
                dispatch(changeStatusAC("failed"))
                toast.error(error, {
                    duration: 2000
                })
            })
}

