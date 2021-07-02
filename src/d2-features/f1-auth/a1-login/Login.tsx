import React from "react";
import {useDispatch} from "react-redux";
import {loginTC} from "../../../d1-main/bll/loginReducer";
import {Field, useFormik} from "formik";


export const Login = () => {
    const dispatch = useDispatch()

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
                errors.password = 'Password is required';
            }   else if (!/^[A-Z0-9._%+-]{5,15}$/i.test(values.password)) {
                errors.email = 'Invalid password';
            }
            return errors;
        },
        onSubmit: values => {
            console.log(values)
            alert(JSON.stringify(values));
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })
    let onRememberMeChange = () => {
       formik.values.rememberMe = !formik.values.rememberMe;
    }

    return (
        <div>
            <div>Login</div>
            <form action="" onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="email">email</label>
                    <input  type='text' id='email'
                            {...formik.getFieldProps('email')} />
                </div>
                <div>
                    <label htmlFor="password">password</label>
                    <input type='password' id='password'
                           {...formik.getFieldProps('password')} />
                </div>
                <div>
                    <label htmlFor="rememberMe">remember me</label>
                    <input onChange={onRememberMeChange}
                           type="checkbox" name="rememberMe" />
                </div>
                <button type='submit'>Send</button>
            </form>
        </div>
    );
}
