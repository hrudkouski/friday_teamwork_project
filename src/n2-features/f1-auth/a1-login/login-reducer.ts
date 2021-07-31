import {loginApi} from "../../../n3-dall/api/api_cards";
import {AppThunkType} from "../../../n1-main/m2-bll/store/redux-store";

// Actions
const SET_IS_LOGGED_IN = 'friday_teamwork_project/login-reducer/SET_IS_LOGGED_IN';
const SET_IS_LOGGED_OUT = 'friday_teamwork_project/login-reducer/SET_IS_LOGGED_OUT';

// Types
export type LoginActionsType = ReturnType<typeof logInAC> | ReturnType<typeof logOutAC>;
export type ProfileType = {
    email: string
    password: string
    rememberMe: boolean
}
type InitialStateType = {
    profile: ProfileType | null,
    isLoggedIn: boolean
}

// Initial State
const initialState: InitialStateType = {
    profile: null,
    isLoggedIn: false
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
export const logInAC = (profile: ProfileType, isLoggedIn: boolean) => ({
    type: SET_IS_LOGGED_IN, profile, isLoggedIn
} as const)
export const logOutAC = (isLoggedIn: boolean) => ({
    type: SET_IS_LOGGED_OUT, isLoggedIn
} as const)

// Thunk Creators
export const loginTC = (profile: ProfileType): AppThunkType => (dispatch) => {
    loginApi.login(profile)
        .then(() => {
            dispatch(logInAC(profile, true))
            alert('User: ' + profile.email + ' has been Successfully logged in!')
        })
        .catch((err) => {
            console.log(err.message)
            alert('Invalid email or password')
        })
}

export const logOutTC = (): AppThunkType => (dispatch) => {
    loginApi.logOut()
        .then(() => {
            dispatch(logOutAC(false))
            alert("logOut success —ฅᐠ.̫ .ᐟฅ—")
        })
        .catch((err) => {
            console.log(err.message)
            alert(err.message)
        })
}