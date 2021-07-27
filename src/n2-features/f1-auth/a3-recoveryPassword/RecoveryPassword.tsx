import SuperInputText from "../../../n1-main/m1-ui/u3-common/Super-Components/c1-SuperInputText/SuperInputText"
import SuperButton from "../../../n1-main/m1-ui/u3-common/Super-Components/c2-SuperButton/SuperButton"
import {useFormik} from "formik";

type ErrorsDataType = {
    email?: string
}

export const RecoveryPassword = () => {

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
            console.log(values)
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="email">Email Address</label>
                <SuperInputText type="email"
                                {...formik.getFieldProps("email")}/>
                {formik.errors.email
                    ? (<div style={{color: "red"}}>{formik.errors.email}</div>)
                    : null}
            </div>
            <SuperButton type="submit">Submit</SuperButton>
        </form>
    )
}