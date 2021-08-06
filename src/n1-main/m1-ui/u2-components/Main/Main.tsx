import {Routes} from "../../u4-routes/Routes";
import {Header} from "../Header/Header";
import m from './Main.module.css'
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {authMeTC} from "../../../../n2-features/f1-auth/a1-login/login-reducer";

export const Main = () => {

    const dispatch = useDispatch();
    
    useEffect(() => {
         dispatch(authMeTC())
    }, [dispatch])

    return (
        <div className={m.main}>
            <div className={m.container}>
                <Header/>
                <Routes/>
            </div>
        </div>
    )
}