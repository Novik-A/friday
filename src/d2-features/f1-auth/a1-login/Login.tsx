import React, {ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import { loginTC } from "../../../d1-main/bll/loginReducer";
import {LoginParamsType} from "../../../d1-main/dal/api-login";


export const Login = () => {
    const dispatch = useDispatch()

    const onLoginHandler = () => {
        dispatch(loginTC(loginData))
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [checkbox, setCheckbox] = useState(false)
    let loginDataDefault = {
        email: email,
        password: password,
        rememberMe: checkbox
    }
    const [loginData, setLoginData] = useState(loginDataDefault)
    const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        setLoginData({
            email: email,
            password: password,
            rememberMe: checkbox
        })
    }
    const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        setLoginData({
            email: email,
            password: password,
            rememberMe: checkbox
        })
    }
    const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckbox(e.currentTarget.checked)
        setLoginData({
            email: email,
            password: password,
            rememberMe: checkbox
        })
    }
    return (
        <div>
            <div>Login</div>
            loginTC
                <div>
                    <label htmlFor="email">email</label>
                    <input onChange={onEmailChange} type='text' id='email'/>
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input onChange={onPasswordChange} type='password' id='password'/>
                </div>
                <div>
                    <label htmlFor="rememberMe">remember me</label>
                    <input onChange={onCheckboxChange} type="checkbox" id='rememberMe'/>
                </div>
                <button onClick={onLoginHandler}>Send</button>
        </div>
    );
}
