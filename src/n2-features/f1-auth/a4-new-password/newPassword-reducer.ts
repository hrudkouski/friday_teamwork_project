import {recoveryPasswordApi} from "../../../n3-dall/api/api_cards";

export const newPasswordReducer = (state: any, action: any): any => {
    switch (action.type) {
        default:
            return {...state}
    }
}

export const newPassword = (password: string, resetPasswordToken: {}) => (
    recoveryPasswordApi.newPassword(password, resetPasswordToken)
)