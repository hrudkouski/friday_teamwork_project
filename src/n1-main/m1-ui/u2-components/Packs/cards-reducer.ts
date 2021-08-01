import {CardPacksDataType, cardsApi, ResponseDataType} from "../../../../n3-dall/api/api_cards";
import {Dispatch} from "redux";

const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1,
    pageCount: 4,
}

export const cardsReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET_CARDS":
            return {...state, cardPacks: action.cards}
        default:
            return state
    }
}

export const setCardsAC = (cards: Array<CardPacksDataType>) => ({type: "CARDS/SET_CARDS", cards} as const)

export const setCards = (dispatch: Dispatch) => {
    cardsApi.getCards()
        .then(response => {
            dispatch(setCardsAC(response.data.cardPacks))
        })
}

export type InitialStateType = ResponseDataType

export type AppActionsType = ReturnType<typeof setCardsAC>;


