import { Routes } from "../../u4-routes/Routes";
import {Header} from "../Header/Header";
import m from './Main.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { isInitializedTC } from "../../u1-app/app-reducer";
import { AppRootStateType } from "../../../m2-bll/store/redux-store";
import { Preloader } from "../../u3-common/Super-Components/c7-Preloader/Preloader";


export const Main = () => {

    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const dispatch = useDispatch();

    useEffect(() => {
         dispatch(isInitializedTC())
    }, [dispatch])

    if(!isInitialized){
        return <Preloader />
    }

    return (
        <div className={m.main}>
            <div className={m.container}>
                <Header/>
                <Routes/>
            </div>
        </div>
    )
}