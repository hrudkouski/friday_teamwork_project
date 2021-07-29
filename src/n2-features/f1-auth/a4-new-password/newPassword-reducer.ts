import { Dispatch } from "redux";
import {recoveryPasswordApi} from "../../../n3-dall/api/api_cards";

const initialState: InitialStateType = {
    isPasswordChanged: false
}

export const newPasswordReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "NEW-PASSWORD/PASSWORD-CHANGED":
            return {...state, isPasswordChanged: action.value}
        default:
            return {...state}
    }
}

const passwordChanged = (value: boolean) => ({type: "NEW-PASSWORD/PASSWORD-CHANGED", value})

export const newPassword = (password: string, resetPasswordToken: {}) => (dispatch: Dispatch<ActionType>) => (
    recoveryPasswordApi.newPassword(password, resetPasswordToken)
        .then(response => {
            dispatch(passwordChanged(true))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log(error)
            alert(error)
        })
)

type InitialStateType = {
    isPasswordChanged: boolean
}

type ActionType = ReturnType<typeof passwordChanged>