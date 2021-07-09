import React from "react";
import TableContainer from "../../../d2-features/tabels/TableContainer";
import {Redirect} from "react-router";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";



export const Profile = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginRegister.isLoggedIn)
    if(!isLoggedIn) {
        return <Redirect to={'/login'} />
    }
    return (
        <div>
            <div>Profile</div>
            <TableContainer />
        </div>
    );
}
