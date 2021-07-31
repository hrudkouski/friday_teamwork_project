import {useDispatch} from "react-redux";
import {passwordRecovery} from "./recoveryPassword-reducer";
import {CommonForm} from "../../../n1-main/m1-ui/u3-common/CommonForm/CommonForm";

export const RecoveryPassword = () => {

    const dispatch = useDispatch()

    const from = "test-front-admin <ai73a@yandex.by>"
    const message =
        `<div>
            <a href='https://hrudkouski.github.io/friday_teamwork_project/#/new-password/$token$'>link</a> 
        </div>`

    const recoveryCallBackHandler = (values: any) => {
        dispatch(passwordRecovery(values.email, from, message))
    }

    return (
        <>
            <CommonForm type={'Recovery password'} callBack={recoveryCallBackHandler}/>
        </>
    )
}