import React from 'react';
import s from './Forgot.module.css'
import SuperInputText from "../../../../d1-main/ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../../d1-main/ui/common/c2-SuperButton/SuperButton";
import {PATH} from "../../../../d1-main/ui/Routes/Routes";
import {NavLink} from "react-router-dom";


type IForgotProps = {

}

const Forgot: React.FC<IForgotProps> = (
    {

    }
) => {

    console.log('render Forgot');
    return (
        <div className={s.body}>
            <div className={s.header}>It-incubator</div>
            <div className={s.page}>Forgot your password?</div>
            <SuperInputText placeholder={'Email'}/>
            <div className={s.text}>Enter your email address and we will send you further instructions</div>
            <SuperButton>Send Instructions</SuperButton>
            <div className={s.text}>Did you remember your password?</div>
            <NavLink to={PATH.LOGIN} className={s.link}>Try logging in</NavLink>
        </div>
    );
};

export default Forgot;
