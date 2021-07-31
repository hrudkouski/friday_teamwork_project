import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {loginTC} from "./login-reducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {CommonForm} from "../../../n1-main/m1-ui/u3-common/CommonForm/CommonForm";

export const Login = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const callBackHandler = (values: any) => {

        const loginProfile = {
            email: values.email,
            password: values.password,
            rememberMe: values.rememberMe
        }

        dispatch(loginTC(loginProfile))
    }

    if (isLoggedIn) {
        return <Redirect to={'/profile'}/>
    }

    return <CommonForm type={'Login'} callBack={callBackHandler}/>
}