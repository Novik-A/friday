import React from "react";
import {NavLink} from "react-router-dom";
import {PATH} from "../Routes/Routes";
import s from "./Header.module.css";

export const Header = (props: HeaderPropsType) => {

    return (
        <div className={s.header}>
            <NavLink to={PATH.MAIN} className={s.link} activeClassName={s.active}>Main</NavLink>
            {!props.isLoggedIn && <NavLink to={PATH.LOGIN} className={s.link} activeClassName={s.active}>Login</NavLink>}
            {!props.isLoggedIn && <NavLink to={PATH.REGISTER} className={s.link} activeClassName={s.active}>Register</NavLink>}
            {!props.isLoggedIn && <NavLink to={PATH.FORGOT} className={s.link} activeClassName={s.active}>Forgot</NavLink>}
            <NavLink to={PATH.PROFILE} className={s.link} activeClassName={s.active}>Profile</NavLink>
            <NavLink to={PATH.PACKS} className={s.link} activeClassName={s.active}>Packs</NavLink>
            <NavLink to={PATH.CARDS} className={s.link} activeClassName={s.active}>Cards</NavLink>
        </div>
    );
}

type HeaderPropsType = {
    isLoggedIn: boolean
}
