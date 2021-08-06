import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../m2-bll/store/redux-store";
import {ProfileResponseType} from "../../../../n2-features/f1-auth/a1-login/login-reducer";
import {Redirect} from "react-router-dom";
import {StatusType} from "../../u1-app/app-reducer";
import p from './Profile.module.css'
import {Preloader} from "../../u3-common/Super-Components/c7-Preloader/Preloader";

export const Profile = () => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)
    const profile = useSelector<AppRootStateType, ProfileResponseType>(state => state.login.profile)


    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <>
            {status === "loading" && <Preloader/>}
            <div className={p.profile}>
                
                <h2 className={p.title}>Profile Page</h2>
                <div className={p.greeting}>Hello, {profile.name}</div>
                <div className={p.numberOfPacks}>You have {profile.publicCardPacksCount} packs.</div>


            </div>
        </>
    )
}