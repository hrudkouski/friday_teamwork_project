import {CardPacksDataType, cardsApi, ResponseDataType} from "../../../../n3-dall/api/api_cards";
import {AppRootStateType} from "../../../m2-bll/store/redux-store";
import {ThunkDispatch} from "redux-thunk";

const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1,
    pageCount: 4,
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET_CARDS":
            return {...state, cardPacks: action.cards}
        default:
            return state
    }
}

export const setPacksAC = (cards: Array<CardPacksDataType>) => ({type: "CARDS/SET_CARDS", cards} as const)

export const setPacks = (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    cardsApi.getPacks()
        .then(response => {
            dispatch(setPacksAC(response.data.cardPacks))
        })
}

export const createPacks = (title: string) =>
    (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    cardsApi.createPacks(title)
        .then(response => {
            dispatch(setPacks)
        })
}

export const deletePacks = (_id: string) =>
    (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    cardsApi.deletePacks(_id)
        .then(response => {
            dispatch(setPacks)
        })
}

export type InitialStateType = ResponseDataType

export type ActionsType = ReturnType<typeof setPacksAC>


