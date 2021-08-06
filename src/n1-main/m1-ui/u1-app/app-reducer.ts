import { logInAC } from "../../../n2-features/f1-auth/a1-login/login-reducer";
import { loginApi } from "../../../n3-dall/api/api_cards";
import { AppThunkType } from "../../m2-bll/store/redux-store";

// Actions
const SET_ERROR = 'friday_teamwork_project/app-reducer/SET_ERROR';
const CHANGE_STATUS = 'friday_teamwork_project/app-reducer/CHANGE_STATUS';
const SET_IS_INITIALIZED = 'friday_teamwork_project/login-reducer/SET_IS_AM_AUTH';

// Types
export type ErrorType = null | string;
export type SetAppErrorAT = ReturnType<typeof setAppError>;
export type ChangeStatusAT = ReturnType<typeof changeStatusAC>;
export type SetIsInitializedAT = ReturnType<typeof setIsInitializedAC>
export type AppActionsType = SetAppErrorAT | ChangeStatusAT | SetIsInitializedAT;
export type InitialStateType = typeof initialState;
export type StatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

//Initial State
const initialState = {
    error: null as ErrorType,
    status: 'idle' as StatusType,
    isInitialized: false
}

// Reducer
export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case SET_ERROR:
            return {...state, error: action.error}
        case CHANGE_STATUS:
            return {...state, status: action.status}
        case SET_IS_INITIALIZED:
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

// Action Creators
export const setAppError = (error: ErrorType) => ({type: SET_ERROR, error}) as const;
export const changeStatusAC = (status: StatusType) =>
    ({type: CHANGE_STATUS, status} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: SET_IS_INITIALIZED, isInitialized} as const)

// Thunk
export const isInitializedTC = (): AppThunkType =>
    (dispatch) => {
    dispatch(changeStatusAC("loading"))
    loginApi.authMe()
        .then((res) => {
            console.log(res)
                dispatch(setIsInitializedAC(true))
                dispatch(logInAC(res.data, true))
                dispatch(changeStatusAC("succeeded"))
        })
        .catch((err) => {
            console.log(err.message)
            dispatch(changeStatusAC("succeeded"))
            //dispatch(setIsInitializedAC(false))
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}