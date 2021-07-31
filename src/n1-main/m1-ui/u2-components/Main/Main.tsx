import {Routes} from "../../u4-routes/Routes";
import {Header} from "../Header/Header";
import m from './Main.module.css'

export const Main = () => {
    return (
        <div className={m.main}>
            <div className={m.container}>
                <Header/>
                <Routes/>
            </div>
        </div>
    )
}