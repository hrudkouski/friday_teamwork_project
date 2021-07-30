import {useFormik} from "formik";
import {Redirect} from "react-router-dom";
import SuperInputText from "../../../n1-main/m1-ui/u3-common/Super-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/u3-common/Super-Components/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "./register-reducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";
import {useState} from "react";
import s from './Register.module.css';

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
                errors.confirmPassword = 'Password mismatch';
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
        <div className={s.authRegister}>
            <div className={s.wrapper}>
                <span className={s.incubator}>Sign up</span>
                <span className={s.signUp}>Please fill in the form below</span>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.inputFormRegister}>
                        <label htmlFor="email">Email</label>
                        <SuperInputText
                            id="email"
                            type="email"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.errors.email && formik.touched.email &&
                        <div className={s.errorMessage}>{formik.errors.email}</div>}
                    </div>

                    <div className={s.inputFormRegister}>
                        <label htmlFor="password">Password</label>
                        <SuperInputText
                            id="password"
                            type={type}
                            {...formik.getFieldProps('password')}
                        />
                        <span className={s.showHideMenu}
                              onClick={showHide}>{type === 'text' ? '🔒' : '🔑'}</span>
                        {formik.errors.password && formik.touched.password &&
                        <div className={s.errorMessage}>{formik.errors.password}</div>}
                    </div>

                    <div className={s.inputFormRegister}>
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <SuperInputText
                            id="confirmPassword"
                            type="password"
                            {...formik.getFieldProps('confirmPassword')}
                        />
                        {formik.errors.confirmPassword && formik.touched.confirmPassword &&
                        <div className={s.errorMessage}>{formik.errors.confirmPassword}</div>}
                    </div>

                    <div className={s.buttonFormRegister}>
                        <SuperButton
                            className={s.button}
                            type='reset'>Cancel
                        </SuperButton>
                        <SuperButton
                            className={s.button}
                            type="submit">Sign up
                        </SuperButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

