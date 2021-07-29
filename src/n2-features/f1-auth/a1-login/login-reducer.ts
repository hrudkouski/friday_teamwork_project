import { addSyntheticTrailingComment } from "typescript";
import { AppRootStateType } from "../../../n1-main/m2-bll/store/redux-store";
import {Dispatch} from 'redux';
import { loginApi } from "../../../n3-dall/api/api_cards";

// Initial State
type InitialStateType = {
    profile: ProfileType | null,
    isLoggedIn: boolean
}

const initialState: InitialStateType = {
    profile: null,
    isLoggedIn: false
}




// Reducer
export const loginReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {

        case 'LOGIN': {
            return {...state, profile: action.profile, isLoggedIn: action.isLoggedIn}
        }

        default:
            return {...state}
    }
}

export type ProfileType = {
    email: string
    password: string
    rememberMe: boolean
}

// Actions
export const login = (profile: ProfileType, isLoggedIn: boolean) => (
    {type: 'LOGIN', profile, isLoggedIn} as const) 

// Types
type ActionsType = ReturnType<typeof login>


// Thunk Creators
export const loginTC = (profile: ProfileType) => (dispatch: Dispatch<ActionsType>) => {
    

    loginApi.login(profile)
        .then( (res) => {
            dispatch(login(profile, true))
            alert('User: ' + profile.email + ' has been Successfully logged in!')
        })
        .catch( (err) => {
            console.log(err.message)
            alert('Invalid email or password')
        })
}