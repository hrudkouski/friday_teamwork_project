import {Dispatch} from 'redux';
import {setAppError, SetAppErrorAT} from "../../n1-main/m1-ui/u1-app/app-reducer";

// generic function

// export const handleServerAppError = <T>(data: CommonResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
//     if (data.messages.length) {
//         dispatch(setAppError(data.messages[0]))
//     } else {
//         dispatch(setAppError('Some error occurred'))
//     }
//     dispatch(setAppStatus('failed'))
// }

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppError(error.message))
    // dispatch(setAppStatus('failed'))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorAT>