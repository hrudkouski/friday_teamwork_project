import SuperInputText from "../../../n1-main/m1-ui/u3-common/Super-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/u3-common/Super-Components/c2-SuperButton/SuperButton";
import {useFormik} from "formik";

type ErrorsDataType = {
    newPassword?: string
    repeatPassword?: string
}

export const NewPassword = () => {

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            repeatPassword: ''
        },

        validate: (values => {
            let errors: ErrorsDataType = {};

            if (!values.newPassword) {
                errors.newPassword = "Required"
            } else if (values.newPassword.length < 8) {
                errors.newPassword = "Password must be more than 7 characters."
            }

            if (!values.repeatPassword) {
                errors.repeatPassword = "Required"
            } else if (values.repeatPassword !== values.newPassword) {
                errors.repeatPassword = "Password mismatch"
            }

            return errors;
        }),

        onSubmit: values => {
            console.log(values)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="password">New Password</label>
                <SuperInputText type="password"
                                {...formik.getFieldProps("newPassword")}/>
                {formik.touched.newPassword && formik.errors.newPassword
                    ? (<div style={{color: "red"}}>{formik.errors.newPassword}</div>)
                    : null}
            </div>
            <div>
                <label htmlFor="password">Repeat Password</label>
                <SuperInputText type="password"
                                {...formik.getFieldProps("repeatPassword")}/>
                {formik.touched.repeatPassword && formik.errors.repeatPassword
                    ? (<div style={{color: "red"}}>{formik.errors.repeatPassword}</div>)
                    : null}
            </div>
            <SuperButton type="submit">Submit</SuperButton>
        </form>
    )
}