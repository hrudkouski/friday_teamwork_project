import SuperButton from "../../u3-common/Super-Components/c2-SuperButton/SuperButton"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store/redux-store";
import {logOutAC} from "../../../../n2-features/f1-auth/a1-login/login-reducer";
import {useCallback} from "react";
import {Redirect} from "react-router-dom";

export const Profile = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)

    const logOutHandler = useCallback(() => {
        dispatch(logOutAC(false))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            Profile Page
            <SuperButton onClick={logOutHandler}>LOG OUT</SuperButton>
        </>
    )
}