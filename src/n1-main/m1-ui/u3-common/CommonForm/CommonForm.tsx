import {useFormik} from "formik";
import {useState} from "react";
import s from './CommonForm.module.css';
import SuperInputText from "../Super-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../Super-Components/c2-SuperButton/SuperButton";


type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}

type FormPropsType = {
    type: 'Login' | 'Register' | 'Recovery password',
    callBack?: (values: any) => void
}

export const CommonForm = (props: FormPropsType) => {


    const [type, setType] = useState<string>('password')

    const showHide = () => {
        setType(type === 'text' ? 'password' : 'text')
    }


    // SET initial values for Formik start
    let initialValues: any = null

    if(props.type === 'Login') {
        initialValues = {
            email: '',
            password: '',
        }
    }
    if(props.type === 'Register') {
        initialValues = {
            email: '',
            password: '',
            confirmPassword: '',
        }
    }
    if(props.type === 'Recovery password') {
        initialValues = {
            email: '',
        }
    }
    // SET initial values for Formik end
    

    const formik = useFormik({
        
        initialValues,

        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Email is required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if(props.type === 'Login' || props.type === 'Register') { // Check PASSWORD field only if form for Login or Register
                if (!values.password) {
                    errors.password = 'Password is required';
                } else if (!/(?=.*[0-9])/gi.test(values.password)) {
                    errors.password = 'The password must contain at least one number'
                } else if (!/(?=.*[a-z])(?=.*[A-Z])/gi.test(values.password)) {
                    errors.password = 'The password  must contain at least one lowercase or uppercase Latin letter'
                } else if (!/[0-9a-zA-Z!@#$%^&*]{8,}/gi.test(values.password)) {
                    errors.password = 'The password must have a minimum 8 characters'
                }
            }

            if(props.type === 'Register'){ // Check CONFIRM PASSWORD field only if form for Register
                if (!values.confirmPassword) {
                    errors.confirmPassword = 'Confirm password is required';
                } else if (values.password !== values.confirmPassword) {
                    errors.confirmPassword = 'The password and confirm password fields do not match.';
                }
            }
            

            return errors;
        },
        onSubmit: values => {
            //dispatch(registerUser(values.email, values.password))
            {props.callBack && props.callBack(values)}
            formik.resetForm();
        },
    });


    // Reusable Email Field
    const emailField = () => {
        return <>
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
        </>
    }
    // Reusable Password Field
    const passwordField = () => {
        return <>
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
        </>
    }
    // Reusable Confirm Password Field
    const confirmPasswordField = () => {
        return <>
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
        </>
    }

    // Reusable Button
    const submitButton = (title: string) => {
        
        return <>
            <div className={s.buttonFormRegister}>
                <SuperButton
                    className={s.button}
                    type="submit">{title}
                </SuperButton>
            </div>
        </>
    }

    // Form Generator 
    const formGenerator = () => {

        
        switch(props.type) {

            case 'Login' :
                return <>
                {emailField()}
                {passwordField()}
                {submitButton('Login')}
                </>
            
            case 'Register' :
                return <>
                {emailField()}
                {passwordField()}
                {confirmPasswordField()}
                {submitButton('Register')}
                </>
            
            case 'Recovery password' :
                return <>
                {emailField()}
                {submitButton('Reset')}
                </>
            
            default : 
                return <>
                {emailField()}
                {passwordField()}
                {confirmPasswordField()}
                {submitButton('N/A')}
                </>
        }
        
    }    

    return (
        <div className={s.authRegister}>
            <div className={s.wrapper}>
                <span className={s.incubator}>It-incubator</span>

                {/* Form Title */}
                <span className={s.signUp}>{props.type}</span>

                <form onSubmit={formik.handleSubmit}>
                    
                    {/* Form generator function */}
                   {formGenerator()}

                </form>
            </div>
        </div>
    )
}

