import {recoveryPasswordApi} from "../../../n3-dall/api/api_cards";
import {Dispatch} from "redux";
import {changeStatusAC} from "../../../n1-main/m1-ui/u1-app/app-reducer";
import {toast} from "react-hot-toast";

export const recoveryPasswordReducer = (state: any, action: any): any => {
    switch (action.type) {
        default:
            return {...state}
    }
}

export const passwordRecovery = (email: string, from: string, message: {}) => (dispatch: Dispatch) => {
    dispatch(changeStatusAC("loading"))
    recoveryPasswordApi.passwordRecovery(email, from, message)
        .then(response => {
            toast.success('Instructions send your mail')
            dispatch(changeStatusAC("succeeded"))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            dispatch(changeStatusAC("failed"))
            toast.error(error)
        })
}