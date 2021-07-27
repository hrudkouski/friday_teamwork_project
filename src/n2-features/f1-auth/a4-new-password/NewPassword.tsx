import SuperInputText from "../../../n1-main/m1-ui/u3-common/Super-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/u3-common/Super-Components/c2-SuperButton/SuperButton";
import {useFormik} from "formik";

export const NewPassword = () => {

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            repeatPassword: ''
        },
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
            </div>
            <div>
                <label htmlFor="password">Repeat Password</label>
                <SuperInputText type="password"
                                {...formik.getFieldProps("repeatPassword")}/>
            </div>
            <SuperButton type="submit">Submit</SuperButton>
        </form>
    )
}