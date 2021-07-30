import {Dispatch} from "redux";
import {recoveryPasswordApi} from "../../../n3-dall/api/api_cards";
import {changeStatusAC} from "../../../n1-main/m1-ui/u1-app/app-reducer";

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

export const newPassword = (password: string, resetPasswordToken: {}) => (dispatch: Dispatch) => {
    dispatch(changeStatusAC("loading"))
    recoveryPasswordApi.newPassword(password, resetPasswordToken)
        .then(response => {
            dispatch(passwordChanged(true))
            dispatch(changeStatusAC("succeeded"))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log(error)
            alert(error)
        })
}

type InitialStateType = {
    isPasswordChanged: boolean
}

type ActionType = ReturnType<typeof passwordChanged>