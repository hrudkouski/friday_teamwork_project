import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "./register-reducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {CommonForm} from "../../../n1-main/m1-ui/u3-common/CommonForm/CommonForm";
import {Redirect} from "react-router-dom";

export const Register = () => {

    const isRegister = useSelector<AppRootStateType, boolean>(state => state.register.isRegister)
    const dispatch = useDispatch();

    const registerCallBackHandler = (values: any) => {
        dispatch(registerUser(values.email, values.password))
    }

    if (isRegister) {
        return <Redirect to={'/login'}/>
    }

    return <CommonForm type={'Register'} callBack={registerCallBackHandler}/>
}
