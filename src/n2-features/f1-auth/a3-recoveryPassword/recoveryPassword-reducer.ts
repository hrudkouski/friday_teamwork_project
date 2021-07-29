import {recoveryPasswordApi} from "../../../n3-dall/api/api_cards";
import {Dispatch} from "redux";

export const recoveryPasswordReducer = (state: any, action: any): any => {
    switch (action.type) {
        default:
            return {...state}
    }
}

export const passwordRecovery = (email: string, from: string, message: {}) => (dispatch: Dispatch) => {
    recoveryPasswordApi.passwordRecovery(email, from, message)
        .then()
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log(error)
            alert(error)
        })
}