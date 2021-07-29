import SuperInputText from "../../../n1-main/m1-ui/u3-common/Super-Components/c1-SuperInputText/SuperInputText"
import SuperButton from "../../../n1-main/m1-ui/u3-common/Super-Components/c2-SuperButton/SuperButton"
import {useFormik} from "formik";
import {useDispatch} from "react-redux";
import {passwordRecovery} from "./recoveryPassword-reducer";
import s from './RecoveryPassword.module.css';

type ErrorsDataType = {
    email?: string
}

export const RecoveryPassword = () => {

    const dispatch = useDispatch()

    const from = "test-front-admin <ai73a@yandex.by>"
    const message =
        `<div>
            <a href='http://localhost:3000/#/new-password/$token$'>link</a> 
        </div>`

    const formik = useFormik({
        initialValues: {
            email: '',
        },

        validate: (values => {
            let errors: ErrorsDataType = {};

            if (!values.email) {
                errors.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }

            return errors;
        }),

        onSubmit: values => {
            dispatch(passwordRecovery(values.email, from, message))
        },
    });

    return (
        <div className={s.wrapper}>
            <span className={s.signUp}>Recovery Password</span>
            <form onSubmit={formik.handleSubmit}>
                <div className={s.inputFormRegister}>
                    <label htmlFor="email">Email Address</label>
                    <SuperInputText type="email"
                                    {...formik.getFieldProps("email")}/>
                    {formik.errors.email
                        ? (<div className={s.errorMessage}>{formik.errors.email}</div>)
                        : null}
                </div>
                <SuperButton type="submit">Send</SuperButton>
            </form>
        </div>
    )
}