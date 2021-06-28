import React from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../Routes/Routes";
import s from "./Header.module.css";

export const Header = () => {
    return (
        <div className={s.header}>
            <NavLink to={PATH.MAIN} className={s.link} activeClassName={s.active}>Main</NavLink>
            <NavLink to={PATH.LOGIN} className={s.link} activeClassName={s.active}>Login</NavLink>
            <NavLink to={PATH.REGISTER} className={s.link} activeClassName={s.active}>Register</NavLink>
            <NavLink to={PATH.FORGOT} className={s.link} activeClassName={s.active}>Forgot</NavLink>
            <NavLink to={PATH.TEST} className={s.link} activeClassName={s.active}>TestPage</NavLink>
            {/*<div className={s.block}/>*/}
        </div>
    );
}

