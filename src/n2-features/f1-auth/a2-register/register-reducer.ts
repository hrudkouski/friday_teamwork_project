import {Dispatch} from "redux";
import {registerApi} from "../../../n3-dall/api/api_cards";

// Actions
const SET_REGISTER_DATA = 'friday_teamwork_project/register-reducer/SET_REGISTER_DATA';

// Types
type InitialStateType = typeof initialState;
export type RegisterActionsType = ReturnType<typeof setRegisterDataAC>

// Initial State
const initialState = {
    isRegister: false
}

// Reducer
export const registerReducer = (state = initialState, action: RegisterActionsType): InitialStateType => {
    switch (action.type) {
        case SET_REGISTER_DATA:
            return {
                ...state,
                isRegister: action.isRegister
            }
        default:
            return {...state}
    }
}

// Action Creators
export const setRegisterDataAC = (isRegister: boolean) => ({
    type: SET_REGISTER_DATA, isRegister
} as const)

// Thunk Creators
export const registerUser = (email: string, password: string) => {
    return (dispatch: Dispatch) => {
        registerApi.registerUser(email, password)
            .then((res) => {
                if (res.data.addedUser._id.length > 0) {
                    dispatch(setRegisterDataAC(true))
                }
            })
            .catch(() => {
                // const error = e.response
                //     ? e.response.data.error
                //     : (e.message + ', more details in the console');
                // console.log('Error: ', {...e})
            })
    }
}