import {CardPacksDataType, packsApi, ResponseDataType} from "../../../../n3-dall/api/api_cards";
import {AppThunkType} from "../../../m2-bll/store/redux-store";
import {changeStatusAC} from "../../u1-app/app-reducer";
import {toast} from "react-hot-toast";

// Initial State
const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 24,
    minCardsCount: 0,
    page: 1,
    pageCount: 7,
    activeModal: false,
    name: ''
}

export const packsReducer = (state: InitialStateType = initialState, action: PacksActionsType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET_NAME":
            return {...state, name: action.name}
        case "CARDS/SET_CARDS":
            return {...state, cardPacks: action.cards}
        case "CARDS/SET_STATUS":
            return {
                ...state, cardPacks: state.cardPacks.map(c => c._id === action.id
                    ? {...c, entityStatus: action.entityStatus} : c)
            }
        case "CARDS/SET_ACTIVE_MODAL":
            return {...state, activeModal: action.active}
        case 'CARDS/SET_CURRENT_PAGE': {
            return {
                ...state,
                page: action.value
            }
        }
        case 'CARDS/SET_PACKS_TOTAL_COUNT':
            return {
                ...state,
                cardPacksTotalCount: action.count
            }
        default:
            return state
    }
}

// Actions Creators
export const setPackNameAC = (name: string) => ({type: "CARDS/SET_NAME", name} as const)
export const setPacksAC = (cards: Array<CardPacksDataType>) => ({type: "CARDS/SET_CARDS", cards} as const)
export const setEntityStatusPacksAC = (entityStatus: EntityStatusType, id: string) =>
    ({type: "CARDS/SET_STATUS", entityStatus, id} as const)
export const setActiveModalAC = (active: boolean) =>
    ({type: "CARDS/SET_ACTIVE_MODAL", active} as const)
export const setCurrentPageAC = (value: number) => ({type: 'CARDS/SET_CURRENT_PAGE', value} as const)
export const setPacksTotalCountAC = (count: number) => ({type: 'CARDS/SET_PACKS_TOTAL_COUNT', count} as const)

// Thunk Creators
export const setPacks = (): AppThunkType =>
    (dispatch, getState) => {

        console.log('Set Packs')

        dispatch(changeStatusAC("loading"))

        const state = getState()
        const currentPage = state.packs.page
        const packsOnPage = state.packs.pageCount
        const packName = state.packs.name

        packsApi.getPacks(packsOnPage, currentPage, packName)
            .then(response => {
                dispatch(setPacksAC(response.data.cardPacks))
                dispatch(setPacksTotalCountAC(response.data.cardPacksTotalCount))
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

export const createPacks = (title: string): AppThunkType =>
    (dispatch) => {

        console.log('Create Packs')

        dispatch(changeStatusAC("loading"))
        packsApi.createPacks(title)
            .then(response => {
                dispatch(setPacks())
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

export const deletePacks = (_id: string): AppThunkType =>
    (dispatch) => {

        console.log('Delete Packs')

        dispatch(changeStatusAC("loading"))
        dispatch(setEntityStatusPacksAC("loading", _id))
        packsApi.deletePacks(_id)
            .then(response => {
                dispatch(setPacks())
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

export const updatePacks = (_id: string, name: string): AppThunkType =>
    
    (dispatch) => {

        console.log('Update Packs')

        dispatch(changeStatusAC("loading"))
        dispatch(setEntityStatusPacksAC("loading", _id))
        packsApi.updatePacks(_id, name)
            .then(response => {
                dispatch(setPacks())
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

// Types
export type InitialStateType = ResponseDataType & {
    activeModal: boolean
    name: string
}
export type EntityStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type PacksActionsType =
    | ReturnType<typeof setPackNameAC>
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setEntityStatusPacksAC>
    | ReturnType<typeof setActiveModalAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setPacksTotalCountAC>


