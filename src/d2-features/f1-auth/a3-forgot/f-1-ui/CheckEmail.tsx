import React from 'react';
import s from './Forgot.module.css'


type CheckEmailProps = {
    email: string
}

export const CheckEmail: React.FC<CheckEmailProps> = ({email}) => {

    console.log('render CheckEmail');

    return (
        <div className={s.body}>
            <div className={s.header}>It-incubator</div>
            <div className={s.page}>Check Email</div>
            <div className={s.text}>We've sent an Email with instructions to {email}</div>
        </div>
    );
};

