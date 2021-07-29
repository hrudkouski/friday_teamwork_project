import {recoveryPasswordApi} from "../../../n3-dall/api/api_cards";

export const recoveryPasswordReducer = (state: any, action: any): any => {
    switch (action.type) {
        default:
            return {...state}
    }
}

export const passwordRecovery = (email: string, from: string, message: {}) => {
    recoveryPasswordApi.passwordRecovery(email, from, message)
}