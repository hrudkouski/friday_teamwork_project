import {useFormik} from "formik";
import {Redirect} from "react-router-dom";
import SuperInputText from "../../../n1-main/m1-ui/u3-common/Super-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/u3-common/Super-Components/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "./register-reducer";
import {AppRootStateType} from "../../../n1-main/m2-bll/store/redux-store";

export const Register = () => {

    const isRegister = useSelector<AppRootStateType, boolean>(state => state.register.isRegister)
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: () => {
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
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
                        name="email"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label htmlFor="password">Password</label>
                    <SuperInputText
                        id="password"
                        name="password"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <SuperInputText
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        onChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                    />
                </div>
                <div>
                    <SuperButton type='reset'>Cancel</SuperButton>
                    <SuperButton type="submit">Register</SuperButton>
                </div>
            </form>
        </div>
    )
}

// My first commit