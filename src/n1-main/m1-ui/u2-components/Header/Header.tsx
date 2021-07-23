import React from "react";
import {NavLink} from "react-router-dom";
import h from './Header.module.css'

export const Header = () => {
    return (
        <div>
            Hello, I'm a Header Component
            <div className={h.wrapper}>
                <NavLink className={h.link} activeClassName={h.active} to={'/login'}>Login page</NavLink>
                <NavLink className={h.link} activeClassName={h.active} to={'/register'}>Register page</NavLink>
                <NavLink className={h.link} activeClassName={h.active} to={'/profile'}>Profile page</NavLink>
                <NavLink className={h.link} activeClassName={h.active} to={'/recovery'}>Recovery page</NavLink>
                <NavLink className={h.link} activeClassName={h.active} to={'/new-password'}>New Password page</NavLink>
                <NavLink className={h.link} activeClassName={h.active} to={'/test'}>Test page</NavLink>
                <NavLink className={h.link} activeClassName={h.active} to={'/404'}>Error page</NavLink>
            </div>
        </div>
    )
}