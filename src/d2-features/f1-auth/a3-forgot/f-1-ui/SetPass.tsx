import React, {ChangeEvent, useEffect, useState} from 'react';
import {Redirect} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../d1-main/bll/store";
import s from "./Forgot.module.css";
import SuperInputText from "../../../../d1-main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../d1-main/ui/common/c2-SuperButton/SuperButton";
import {forgotError, setPassTC} from "../f-2-bll/b-2-redux/forgotReducer";
import {useParams, withRouter } from 'react-router-dom';

const SetPass: React.FC = () => {
    const {token} = useParams<{token: string}>()
    console.log('render SetPass')
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(forgotError(''))
    }, [])
    const error = useSelector<AppRootStateType, string>(state => state.forgot.error)
    const setNewPass = useSelector<AppRootStateType, boolean>(state => state.forgot.setNewPass)

    const [password, setPassword] = useState('')
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        if (error) {
            dispatch(forgotError(''))
        }
    }

    const onSetPassHandler = () => {
        if (password.length < 8) {
            dispatch(forgotError('Password must be more than 7 characters'))
        } else {
            dispatch(setPassTC({password: password, resetPasswordToken: token}))
        }
    }

    if (setNewPass) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div className={s.body}>
            <div className={s.header}>It-incubator</div>
            <div className={s.page}>Create new password</div>
            <SuperInputText onChange={onPasswordChange} error={error} id={'Password'}/>
            <div className={s.text}>Create new password and we will send you further instructions to email</div>
            <SuperButton onClick={onSetPassHandler}>Create new password</SuperButton>
        </div>
    )
};

export default withRouter(SetPass)