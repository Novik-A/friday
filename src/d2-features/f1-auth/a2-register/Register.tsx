import React from "react";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import { registerTC } from "../../../d1-main/bll/loginReducer";
import {Redirect, useHistory} from "react-router-dom";
import {AppRootStateType} from "../../../d1-main/bll/store";

export const Register = () => {

    let isReg = useSelector<AppRootStateType, boolean>(state => state.loginRegister.isRegistered)
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

    return (
        <div>
            <div>Register</div>
            <form action="" onSubmit={formik.handleSubmit}>
                <input type='text'
                    {...formik.getFieldProps('email')}
                />
                {   formik.touched.email &&
                formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                <input type='password'
                    {...formik.getFieldProps('password')}
                />
                {   formik.touched.password &&
                formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>

    );
}
