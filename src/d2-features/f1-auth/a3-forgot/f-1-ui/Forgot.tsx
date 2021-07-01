import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Forgot.module.css'
import SuperInputText from "../../../../d1-main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../d1-main/ui/common/c2-SuperButton/SuperButton";
import {PATH} from "../../../../d1-main/ui/Routes/Routes";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {forgotError, forgotTC} from "../f-2-bll/b-2-redux/forgotReducer";


type ForgotProps = {
    error: string
}

const Forgot: React.FC<ForgotProps> = ({error}) => {

    console.log('render Forgot');
    useEffect(() => {
        dispatch(forgotError(''))
    }, [])

    const dispatch = useDispatch()

    const onForgotHandler = () => {
        dispatch(forgotTC(email))
    }
    const [email, setEmail] = useState('')

    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        dispatch(forgotError(''))
    }

    return (
        <div className={s.body}>
            <div className={s.header}>It-incubator</div>
            <div className={s.page}>Forgot your password?</div>
            <SuperInputText onChange={onEmailChange} error={error} id={'Email'}/>
            <div className={s.text}>Enter your email address and we will send you further instructions</div>
            <SuperButton onClick={onForgotHandler}>Send Instructions</SuperButton>
            <div className={s.text}>Did you remember your password?</div>
            <NavLink to={PATH.LOGIN} className={s.link}>Try logging in</NavLink>
        </div>
    );
};

export default Forgot;
