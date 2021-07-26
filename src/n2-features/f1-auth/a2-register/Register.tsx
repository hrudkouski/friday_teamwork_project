import SuperInputText from "../../../n1-main/m1-ui/u3-common/Super-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/u3-common/Super-Components/c2-SuperButton/SuperButton";

export const Register = () => {

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <span style={{color: 'red'}}>it-incubator</span>
            <span style={{color: 'green'}}>Sign Up</span>
            <form action="">
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label htmlFor="email">Email</label>
                    <SuperInputText
                        id="email"
                        name="email"
                        type="text"
                        // onChange={formik.handleChange}
                        // value={formik.values.firstName}
                    />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label htmlFor="password">Password</label>
                    <SuperInputText
                        id="password"
                        name="password"
                        type="password"
                        // onChange={formik.handleChange}
                        // value={formik.values.firstName}
                    />
                </div>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <SuperInputText
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        // onChange={formik.handleChange}
                        // value={formik.values.firstName}
                    />
                </div>
                <div>
                    <SuperButton type="submit">Cancel</SuperButton>
                    <SuperButton type="submit">Register</SuperButton>
                </div>
            </form>
        </div>
    )
}

// My first commit