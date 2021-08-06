import {CardPacksDataType, cardsApi, ResponseDataType} from "../../../../n3-dall/api/api_cards";
import {AppRootStateType} from "../../../m2-bll/store/redux-store";
import {ThunkDispatch} from "redux-thunk";
import {AppActionsType, changeStatusAC} from "../../u1-app/app-reducer";
import {toast} from "react-hot-toast";

const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1,
    pageCount: 4,
    activeModal: false
}

export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET_CARDS":
            return {...state, cardPacks: action.cards}
        case "CARDS/SET_STATUS":
            return {...state, cardPacks: state.cardPacks.map(c => c._id === action.id
                    ? {...c, entityStatus: action.entityStatus} : c)}
        case "CARDS/SET_ACTIVE_MODAL":
            return {...state, activeModal: action.active}
        default:
            return state
    }
}

export const setPacksAC = (cards: Array<CardPacksDataType>) => ({type: "CARDS/SET_CARDS", cards} as const)
export const setEntityStatusPacksAC = (entityStatus: EntityStatusType, id: string) =>
    ({type: "CARDS/SET_STATUS", entityStatus, id} as const)

export const setActiveModalAC = (active: boolean) =>
    ({type: "CARDS/SET_ACTIVE_MODAL", active} as const)

export const setPacks = (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType | AppActionsType>) => {
    dispatch(changeStatusAC("loading"))
    cardsApi.getPacks()
        .then(response => {
            dispatch(setPacksAC(response.data.cardPacks))
            dispatch(changeStatusAC("succeeded"))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(changeStatusAC("failed"))
            toast.error(error)
        })
}

export const createPacks = (title: string) =>
    (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType | AppActionsType>) => {
        dispatch(changeStatusAC("loading"))
    cardsApi.createPacks(title)
        .then(response => {
            dispatch(setPacks)
            dispatch(changeStatusAC("succeeded"))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(changeStatusAC("failed"))
            toast.error(error)
        })
}

export const deletePacks = (_id: string) =>
    (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType | AppActionsType>) => {
        dispatch(changeStatusAC("loading"))
        dispatch(setEntityStatusPacksAC("loading", _id))
    cardsApi.deletePacks(_id)
        .then(response => {
            dispatch(setPacks)
            dispatch(changeStatusAC("succeeded"))
            dispatch(setEntityStatusPacksAC("succeeded", _id))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setEntityStatusPacksAC("failed", _id))
            dispatch(changeStatusAC("failed"))
            toast.error(error)
        })
}

export const updatePacks = (_id: string, name: string) =>
    (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType | AppActionsType>) => {
        dispatch(changeStatusAC("loading"))
        dispatch(setEntityStatusPacksAC("loading", _id))
    cardsApi.updatePacks(_id, name)
        .then(response => {
            dispatch(setPacks)
            dispatch(changeStatusAC("succeeded"))
            dispatch(setEntityStatusPacksAC("succeeded", _id))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(setEntityStatusPacksAC("failed", _id))
            dispatch(changeStatusAC("failed"))
            toast.error(error)
        })
}

export type InitialStateType = ResponseDataType & {
    activeModal: boolean
}
export type EntityStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ActionsType = ReturnType<typeof setPacksAC>
    | ReturnType<typeof setEntityStatusPacksAC>
    | ReturnType<typeof setActiveModalAC>


