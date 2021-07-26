import {useFormik} from "formik";
// import { Redirect } from "react-router-dom";
import SuperInputText from "../../../n1-main/m1-ui/u3-common/Super-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/u3-common/Super-Components/c2-SuperButton/SuperButton";

export const Register = () => {

    // const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    // const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: () => {
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            formik.resetForm();
        },
    });

    // if (isLoggedIn) {
    //     return <Redirect to={'/'}/>
    // }

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