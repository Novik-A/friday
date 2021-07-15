import React from "react";
import TableContainer from "../../../d2-features/tabels/TableContainer";
import {Redirect} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";
import {ResponseLoginType} from "../../dal/api";
import s from "../Header/Header.module.css";
import {logoutTC} from "../../bll/authReducer";



export const Profile = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const userData = useSelector<AppRootStateType, ResponseLoginType>(state => state.auth.userData)
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if(!isLoggedIn) {
        return <Redirect to={'/login'} />
    }
    return (
        <div>
            <div>
                <img src={userData.avatar} alt={"avatar"} height={"200px"}/>
                <div>
                    avatar url: {userData.avatar}
                </div>
                <div>
                    name: {userData.name}
                </div>
            </div>
            <button className={s.link} onClick={logoutHandler}>Log out</button>
            <TableContainer userId={userData._id}/>
        </div>
    );
}
