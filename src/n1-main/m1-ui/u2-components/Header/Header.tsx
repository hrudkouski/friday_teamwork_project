import React from "react";
import {NavLink} from "react-router-dom";
import h from './Header.module.css'

export const Header = () => {
    return (
        <div>
            <div className={h.wrapper}>
                <NavLink className={h.link} activeClassName={h.active} to={'/login'}>SIGN IN</NavLink>
                <NavLink className={h.link} activeClassName={h.active} to={'/register'}>SIGN UP</NavLink>
                <NavLink className={h.link} activeClassName={h.active} to={'/profile'}>Profile</NavLink>
                <NavLink className={h.link} activeClassName={h.active} to={'/recovery'}>Recovery</NavLink>
                <NavLink className={h.link} activeClassName={h.active} to={'/new-password'}>New Password</NavLink>
                <NavLink className={h.link} activeClassName={h.active} to={'/test'}>Test</NavLink>
                <NavLink className={h.link} activeClassName={h.active} to={'/404'}>Error 404</NavLink>
            </div>
        </div>
    )
}