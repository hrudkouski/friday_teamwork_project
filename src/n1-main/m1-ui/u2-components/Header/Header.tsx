import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {NavLink} from "react-router-dom";
import { logOutTC } from "../../../../n2-features/f1-auth/a1-login/login-reducer";
import { AppRootStateType } from "../../../m2-bll/store/redux-store";
import { StatusType } from "../../u1-app/app-reducer";
import SuperButton from "../../u3-common/Super-Components/c2-SuperButton/SuperButton";
import h from './Header.module.css'

export const Header = () => {

    const dispatch = useDispatch();
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.login.isLoggedIn)
    const status = useSelector<AppRootStateType, StatusType>(state => state.app.status)

    const logOutHandler = () => {
        dispatch(logOutTC())
    }

    return (
        <div className={h.header}>
                    
            <div>
                <NavLink
                    className={h.link}
                    activeClassName={h.activeLink}
                    to={'/register'}>Sign up
                </NavLink>
                
                {/* Show Sign In or Profile */}
                {!isLoggedIn ?
                    <NavLink
                        className={h.link}
                        activeClassName={h.activeLink}
                        to={'/login'}>Sign in
                    </NavLink>
                    :
                    <NavLink
                        className={h.link}
                        activeClassName={h.activeLink}
                        to={'/profile'}>Profile
                    </NavLink>
                }

                <NavLink
                    className={h.link}
                    activeClassName={h.activeLink}
                    to={'/packList'}>Packs List
                </NavLink>
            </div>

            {/* Sign Out Button Shows only while Signed In */}
            <div>
                {isLoggedIn && 
                    <SuperButton
                        red
                        disabled={status === "loading"}
                        onClick={logOutHandler}>SIGN OUT
                    </SuperButton>
                }
            </div>

        </div>
    )
}