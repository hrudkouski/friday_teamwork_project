import {useFormik} from "formik";
import {Redirect} from "react-router-dom";
import SuperInputText from "../../../n1-main/m1-ui/u3-common/Super-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/u3-common/Super-Components/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "./register-reducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {useState} from "react";

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

export const Register = () => {

    const isRegister = useSelector<AppRootStateType, boolean>(state => state.register.isRegister)
    const dispatch = useDispatch();

    const [type, setType] = useState<string>('password')

    const showHide = () => {
        setType(type === 'text' ? 'password' : 'text')
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Password is required';
            } else if (!/(?=.*[0-9])/gi.test(values.password)) {
                errors.password = 'The password must contain at least one number'
            } else if (!/(?=.*[a-z])(?=.*[A-Z])/gi.test(values.password)) {
                errors.password = 'The password  must contain at least one lowercase or uppercase Latin letter'
            } else if (!/[0-9a-zA-Z!@#$%^&*]{8,}/gi.test(values.password)) {
                errors.password = 'The password must have a minimum 8 characters'
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Confirm password is required';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'The password and confirm password fields do not match.';
            }

            return errors;
        },
        onSubmit: values => {
            dispatch(registerUser(values.email, values.password))
            formik.resetForm();
        },
    });

    if (isRegister) {
        return <Redirect to={'/login'}/>
    }


    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{color: 'red'}}>it-incubator</span>
            <span style={{color: 'green'}}>Sign Up</span>
            <form onSubmit={formik.handleSubmit}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label htmlFor="email">Email</label>
                    <SuperInputText
                        id="email"
                        type="email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email && formik.touched.email &&
                    <div style={{color: 'red'}}>{formik.errors.email}</div>}
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label htmlFor="password">Password</label>
                    <SuperInputText
                        id="password"
                        type={type}
                        {...formik.getFieldProps('password')}
                    />
                    <span style={
                        {position: "relative", bottom: '48px', left: '275px', width: '30px', cursor: 'pointer'}
                    }
                          onClick={showHide}>{type === 'text' ? '🔒' : '🔑'}</span>
                    {formik.errors.password && formik.touched.password &&
                    <div style={{color: 'red', width: '300px'}}>{formik.errors.password}</div>}
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <SuperInputText
                        id="confirmPassword"
                        type="password"
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                    <div style={{color: 'red', width: '300px'}}>{formik.errors.confirmPassword}</div>}
                </div>
                <div>
                    <SuperButton type='reset'>Cancel</SuperButton>
                    <SuperButton type="submit">Register</SuperButton>
                </div>
            </form>
        </div>
    )
}

