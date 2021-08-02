import {loginApi} from "../../../n3-dall/api/api_cards";
import {AppThunkType} from "../../../n1-main/m2-bll/store/redux-store";
import {changeStatusAC} from "../../../n1-main/m1-ui/u1-app/app-reducer";

// Actions
const SET_IS_LOGGED_IN = 'friday_teamwork_project/login-reducer/SET_IS_LOGGED_IN';
const SET_IS_LOGGED_OUT = 'friday_teamwork_project/login-reducer/SET_IS_LOGGED_OUT';
const SET_IS_AM_AUTH = 'friday_teamwork_project/login-reducer/SET_IS_AM_AUTH';

// Types
export type LoginActionsType =
    | ReturnType<typeof logInAC>
    | ReturnType<typeof logOutAC>
    | ReturnType<typeof authMeAC>;
export type ProfileType = {
    email: string
    password: string
    rememberMe: boolean
}
type InitialStateType = typeof initialState;

// Initial State
const initialState = {
    profile: {
        email: '',
        password: '',
        rememberMe: false,
    } || null,
    isLoggedIn: false,
    isAmAuth: false,
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
        case SET_IS_AM_AUTH: {
            return {
                ...state,
                isAmAuth: action.isAmAuth
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
export const authMeAC = (isAmAuth: boolean) => ({
    type: SET_IS_AM_AUTH, isAmAuth
} as const)

// Thunk Creators
export const loginTC = (profile: ProfileType): AppThunkType => (dispatch) => {
    dispatch(changeStatusAC("loading"))
    loginApi.login(profile)
        .then(() => {
            dispatch(changeStatusAC("succeeded"))
            dispatch(logInAC(profile, true))
            alert('User: ' + profile.email + ' has been Successfully logged in!')
        })
        .catch((err) => {
            dispatch(changeStatusAC("failed"))
            console.log(err.message)
            alert('Invalid email or password')
        })
}

export const logOutTC = (): AppThunkType => (dispatch) => {
    dispatch(changeStatusAC("loading"))
    loginApi.logOut()
        .then(() => {
            dispatch(changeStatusAC("succeeded"))
            dispatch(logOutAC(false))
            alert("logOut success —ฅᐠ.̫ .ᐟฅ—")
        })
        .catch((err) => {
            dispatch(changeStatusAC("failed"))
            alert(err.message)
        })
}

// export const authMeTC = (): AppThunkType =>
//     (dispatch) => {
//     dispatch(changeStatusAC("loading"))
//     loginApi.authMe()
//         .then((res) => {
//             console.log(res)
//             dispatch(changeStatusAC("succeeded"))
//             dispatch(authMeAC(true))
//             alert("logOut success —ฅᐠ.̫ .ᐟฅ—")
//         })
//         .catch((err) => {
//             console.log(err.message)
//             alert(err.message)
//         })
// }