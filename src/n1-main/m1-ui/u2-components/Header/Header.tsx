import React from "react";
import {NavLink} from "react-router-dom";
import h from './Header.module.css'

export const Header = () => {
    return (
        <div className={h.header}>
            <div className={h.wrapper}>
                <div className={h.navMenu}>
                    <NavLink
                        className={h.link}
                        activeClassName={h.activeLink}
                        to={'/login'}>Sign in
                    </NavLink>
                    <NavLink
                        className={h.link}
                        activeClassName={h.activeLink}
                        to={'/register'}>Sign up
                    </NavLink>
                    <NavLink
                        className={h.link}
                        activeClassName={h.activeLink}
                        to={'/profile'}>Profile
                    </NavLink>
                    <NavLink
                        className={h.link}
                        activeClassName={h.activeLink}
                        to={'/packList'}>Packs List
                    </NavLink>
                    <NavLink
                        className={h.link}
                        activeClassName={h.activeLink}
                        to={'/recovery'}>Recovery
                    </NavLink>
                </div>
            </div>
        </div>
    )
}