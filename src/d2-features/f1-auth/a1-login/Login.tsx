import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../../d1-main/bll/authReducer";
import {useFormik} from "formik";
import s from '../a3-forgot/Forgot.module.css';
import {NavLink} from "react-router-dom";
import {PATH} from "../../../d1-main/ui/Routes/Routes";
import SuperInputText from "../../../d1-main/ui/common/c1-SuperInputText/SuperInputText";
import SuperInputPassword from "../../../d1-main/ui/common/c1-SuperInputText/SuperInputPassword";
import {AppRootStateType} from "../../../d1-main/bll/store";
import {Redirect} from "react-router";
import SuperButton from "../../../d1-main/ui/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../../d1-main/ui/common/c3-SuperCheckbox/SuperCheckbox";
import {forgotError} from "../../../d1-main/bll/forgotReducer";


export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const error = useSelector<AppRootStateType, string>(state => state.forgot.error)

    useEffect(() => {
        dispatch(forgotError(''))
    }, [dispatch])

    type FormikErrorType = {
        email?: string
        password?: string
        rememberMe?: boolean
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (!/^[A-Z0-9._%+-]{8,15}$/i.test(values.password)) {
                errors.email = 'Invalid password';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

    if (isLoggedIn) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={s.wrapper}>
            <div className={s.body}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.header}>It-incubator</div>
                    <div className={s.page}>Sing In</div>
                    <div>
                        <SuperInputText id='email' error={error} label={'email'}
                                        {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email &&
                        <div style={{color: 'red'}}>{formik.errors.email}</div>}
                    </div>
                    <div>
                        <SuperInputPassword id='password' label={'password'}
                                            {...formik.getFieldProps('password')} />
                        {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}
                    </div>
                    <div>
                        <SuperCheckbox children={'Remember me'}
                                       {...formik.getFieldProps('rememberMe')}/>
                    </div>
                    <NavLink to={PATH.FORGOT} className={s.textLink}>Forgot password</NavLink>
                    <div>
                        <SuperButton type='submit' width={'150px'}>Login</SuperButton>
                    </div>
                </form>
                <div className={s.text}>Don't have an account?</div>
                <NavLink to={PATH.REGISTER} className={s.link}>Sing Up</NavLink>
            </div>
        </div>
    )
}
