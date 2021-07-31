import {Routes} from "../../u4-routes/Routes";
import {Header} from "../Header/Header";
import m from './Main.module.css'
// import {useDispatch, useSelector} from "react-redux";
// import {useEffect} from "react";
// import {authMeTC} from "../../../../n2-features/f1-auth/a1-login/login-reducer";
// import {AppRootStateType} from "../../../m2-bll/store/redux-store";
// import {Redirect} from "react-router-dom";

export const Main = () => {

    // const dispatch = useDispatch();
    // const isAmAuth = useSelector<AppRootStateType, boolean>(state => state.login.isAmAuth)
    //
    // useEffect(() => {
    //     dispatch(authMeTC())
    // }, [dispatch])
    //
    // if (!isAmAuth) {
    //     return <Redirect to={'/login'}/>
    // }

    return (
        <div className={m.main}>
            <div className={m.container}>
                <Header/>
                <Routes/>
            </div>
        </div>
    )
}