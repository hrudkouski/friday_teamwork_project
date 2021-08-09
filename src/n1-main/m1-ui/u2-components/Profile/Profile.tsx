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

    const avatarAddress = profile.avatar ? profile.avatar : 'https://duiko.guru/landing/privlichenie/img/avatar.png'

    return (
        <>
            {status === "loading" && <Preloader/>}
            <div className={p.profile}>
                <div className={p.ava}>
                    <img src={avatarAddress} alt='avatar' title={'avatar'}/>
                </div>
                <div className={p.greeting}>{profile.email}</div>
                <div className={p.greeting}>Hello, {profile.name}</div>
                <div className={p.numberOfPacks}>
                    You have <span className={p.userPacks}>
                        {profile.publicCardPacksCount}
                    </span> packs
                </div>
            </div>
        </>
    )
}