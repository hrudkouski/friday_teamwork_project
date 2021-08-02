import SuperButton from "../../u3-common/Super-Components/c2-SuperButton/SuperButton"
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store/redux-store";
import {logOutTC} from "../../../../n2-features/f1-auth/a1-login/login-reducer";
import {useCallback} from "react";
import {Redirect} from "react-router-dom";
import {StatusType} from "../../u1-app/app-reducer";
import p from './Profile.module.css'
import {Preloader} from "../../u3-common/Super-Components/c7-Preloader/Preloader";

export const Profile = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)

    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
    }, [dispatch])

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            {status === "loading" && <Preloader/>}
            <div className={p.profile}>
                Profile Page
                <SuperButton
                    disabled={status === "loading"}
                    onClick={logOutHandler}>LOG OUT
                </SuperButton>
            </div>
        </>
    )
}