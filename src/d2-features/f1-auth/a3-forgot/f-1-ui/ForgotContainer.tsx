import React from 'react';
import {Redirect} from "react-router";
import Forgot from './Forgot';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../../d1-main/bll/store";
import {CheckEmail} from "./CheckEmail";

const ForgotContainer: React.FC = () => {
    const linkSent = useSelector<AppRootStateType, boolean>(state => state.forgot.linkSent)
    const email = useSelector<AppRootStateType, string>(state => state.forgot.email)
    const error = useSelector<AppRootStateType, string>(state => state.forgot.error)

    if(false) { // если не залогинен
        return <Redirect to={'/login'} />
    }

    return <>
        {linkSent ? <CheckEmail email={email}/> : <Forgot error={error}/>}
    </>
};

export default ForgotContainer;
