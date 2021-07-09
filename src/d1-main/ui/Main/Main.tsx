import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "../../bll/appReducer";
import {AppRootStateType} from "../../bll/store";

export const Main = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginRegister.isLoggedIn)
    const dispatch = useDispatch()

    const authHandler = () => {
        dispatch(initializeAppTC())
    }
    return (
        <div>
            <div>Main</div>
            {isLoggedIn && <button onClick={authHandler}>Auth me</button>}
        </div>
    );
}