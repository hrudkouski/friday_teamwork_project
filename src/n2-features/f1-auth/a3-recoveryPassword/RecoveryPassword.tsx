import SuperInputText from "../../../n1-main/m1-ui/u3-common/Super-Components/c1-SuperInputText/SuperInputText"
import SuperButton from "../../../n1-main/m1-ui/u3-common/Super-Components/c2-SuperButton/SuperButton"
import {useFormik} from "formik";

export const RecoveryPassword = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
        },
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
            </div>
            <SuperButton type="submit">Submit</SuperButton>
        </form>
    )
}