import React, {useEffect} from "react";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import { registerTC } from "../../../d1-main/bll/loginReducer";
import {Redirect, useHistory} from "react-router-dom";
import {AppRootStateType} from "../../../d1-main/bll/store";
import s from "../a3-forgot/f-1-ui/Forgot.module.css";
import SuperInputText from "../../../d1-main/ui/common/c1-SuperInputText/SuperInputText";
import SuperInputPassword from "../../../d1-main/ui/common/c1-SuperInputText/SuperInputPassword";
import SuperButton from "../../../d1-main/ui/common/c2-SuperButton/SuperButton";
import {forgotError} from "../a3-forgot/f-2-bll/b-2-redux/forgotReducer";

export const Register = () => {
    const error = useSelector<AppRootStateType, string>(state => state.forgot.error)
    const isReg = useSelector<AppRootStateType, boolean>(state => state.loginRegister.isRegistered)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginRegister.isLoggedIn)
    useEffect(() => {
        dispatch(forgotError(''))
    }, [])

    type FormikErrorType = {
        email?: string
        password?: string
    }

    let dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password is required';
            }   else if (!/^[A-Z0-9._%+-]{5,15}$/i.test(values.password)) {
                errors.email = 'Invalid password';
            }
            return errors;
        },
        onSubmit: values => {
            console.log(values)
            alert(JSON.stringify(values));
            dispatch(registerTC(values), )
            formik.resetForm()
        },
    })

    if (isReg) {
        // dispatch(isInitializedAC(true))
        return <Redirect to={'/login'} />
    }
    if(isLoggedIn) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div className={s.body}>
            <div className={s.header}>It-incubator</div>
            <div className={s.page}>Sing In</div>
            <form action="" onSubmit={formik.handleSubmit}>
                <div>
                    <SuperInputText id='email' error={error}
                                    {...formik.getFieldProps('email')}
                    />
                    {   formik.touched.email &&
                    formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                </div>
                <div>
                    <SuperInputPassword id='password'
                                        {...formik.getFieldProps('password')}
                    />
                    {   formik.touched.password &&
                    formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                </div>
                <SuperButton type='submit'>Register</SuperButton>
            </form>
        </div>

    );
}
