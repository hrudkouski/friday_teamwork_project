import {loginApi} from "../../../n3-dall/api/api_cards";
import {AppThunkType} from "../../../n1-main/m2-bll/store/redux-store";
import {changeStatusAC, setIsInitializedAC} from "../../../n1-main/m1-ui/u1-app/app-reducer";
import {toast} from "react-hot-toast";

// Actions
const SET_IS_LOGGED_IN = 'friday_teamwork_project/login-reducer/SET_IS_LOGGED_IN';
const SET_IS_LOGGED_OUT = 'friday_teamwork_project/login-reducer/SET_IS_LOGGED_OUT';

// Types
export type LoginActionsType =
    | ReturnType<typeof logInAC>
    | ReturnType<typeof logOutAC>

export type ProfileResponseType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}
type InitialStateType = typeof initialState;

// Initial State
const initialState = {
    profile: {
        created: '',
        email: '',
        isAdmin: false,
        name: '',
        publicCardPacksCount: 0,
        rememberMe: false,
        token: '',
        tokenDeathTime: 0,
        updated: '',
        verified: false,
        __v: 0,
        _id: ''
    } || null,
    isLoggedIn: false,
}

// Reducer
export const loginReducer = (state: InitialStateType = initialState, action: LoginActionsType): InitialStateType => {
    switch (action.type) {
        case SET_IS_LOGGED_IN: {
            return {
                ...state,
                profile: action.profile,
                isLoggedIn: action.isLoggedIn
            }
        }
        case SET_IS_LOGGED_OUT: {
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        }
        default:
            return {...state}
    }
}

// Actions Creators
export const logInAC = (profile: ProfileResponseType, isLoggedIn: boolean) => ({
    type: SET_IS_LOGGED_IN, profile, isLoggedIn
} as const)
export const logOutAC = (isLoggedIn: boolean) => ({
    type: SET_IS_LOGGED_OUT, isLoggedIn
} as const)

// Thunk Creators
export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunkType => (dispatch) => {
    dispatch(changeStatusAC("loading"))
    loginApi.login(email, password, rememberMe)
        .then((res) => {
            toast.success('Login successful')
            dispatch(changeStatusAC("succeeded"))
            dispatch(logInAC(res.data, true))
        })
        .catch((err) => {
            dispatch(changeStatusAC("failed"))
            toast.error(err.message)
        })
}

export const logOutTC = (): AppThunkType => (dispatch) => {
    dispatch(changeStatusAC("loading"))
    loginApi.logOut()
        .then(() => {
            toast.success("logOut success —ฅᐠ.̫ .ᐟฅ—")
            dispatch(changeStatusAC("succeeded"))
            dispatch(logOutAC(false))
            dispatch(setIsInitializedAC(false))
        })
        .catch((err) => {
            toast.error(err.message)
            dispatch(changeStatusAC("failed"))
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
            dispatch(changeStatusAC("succeeded"))
        })
}