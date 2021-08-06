import {useDispatch, useSelector} from "react-redux";
import {Redirect, useParams } from "react-router-dom";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {StatusType} from "../../../n1-main/m1-ui/u1-app/app-reducer";
import {Preloader} from "../../../n1-main/m1-ui/u3-common/Super-Components/c7-Preloader/Preloader";
import {CommonForm} from "../../../n1-main/m1-ui/u3-common/CommonForm/CommonForm";
import {newPassword} from "./newPassword-reducer";

export const NewPassword = () => {
    const dispatch = useDispatch()
    const {token} = useParams<{token: string}>()
    const isPasswordChanged = useSelector<AppRootStateType, boolean>(state => state.newPassword.isPasswordChanged)
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)

    const newPasswordCallBack = (values: any) => {
        dispatch(newPassword(values.password, token))
    }

    if(isPasswordChanged) {
        return <Redirect to={"/login"}/>
    }

    return (
        <>
            {status === "loading" && <Preloader/>}
            <CommonForm type={'New password'} callBack={newPasswordCallBack}/>
        </>
    )
}
