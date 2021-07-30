import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Error404.module.css'

export const Error404 = () => {
    return <div>
        <div className={s.c}>
            <div className={s._404}>404</div>
            <div className={s._1}>THE PAGE</div>
            <div className={s._2}>WAS NOT FOUND</div>
            <NavLink className={s.btn} to='/profile'>&#8592;BACK TO PROFILE</NavLink>
        </div>
    </div>
}