import React from "react";
import { NavLink } from "react-router-dom";
import { PATH } from "../Routes/Routes";
import s from "./Header.module.css";
import {logoutTC} from "../../bll/loginReducer";
import {useDispatch} from "react-redux";

export const Header = (props: HeaderPropsType) => {

    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logoutTC())
    }
    return (
        <div className={s.header}>
            <NavLink to={PATH.MAIN} className={s.link} activeClassName={s.active}>Main</NavLink>
            <NavLink to={PATH.LOGIN} className={s.link} activeClassName={s.active}>Login</NavLink>
            <NavLink to={PATH.REGISTER} className={s.link} activeClassName={s.active}>Register</NavLink>
            <NavLink to={PATH.FORGOT} className={s.link} activeClassName={s.active}>Forgot</NavLink>
            <NavLink to={PATH.SET_PASS} className={s.link} activeClassName={s.active}>SetPass</NavLink>
            {/*{!props.isLoggedIn && <NavLink to={PATH.SET_PASS} className={s.link} activeClassName={s.active}>SetPass</NavLink>}*/}
            {/*{!props.isLoggedIn && <NavLink to={PATH.REGISTER} className={s.link} activeClassName={s.active}>Register</NavLink>}*/}
            <NavLink to={PATH.PROFILE} className={s.link} activeClassName={s.active}>Profile</NavLink>
            <NavLink to={PATH.TEST} className={s.link} activeClassName={s.active}>TestPage</NavLink>
            <NavLink to={PATH.PACKS} className={s.link} activeClassName={s.active}>Packs</NavLink>
            <NavLink to={PATH.CARDS} className={s.link} activeClassName={s.active}>Cards</NavLink>
            {props.isLoggedIn && <button className={s.link} onClick={logoutHandler}>Log out</button>}
            {/*<div className={s.block}/>*/}
        </div>
    );
}

type HeaderPropsType = {
    isLoggedIn: boolean
}