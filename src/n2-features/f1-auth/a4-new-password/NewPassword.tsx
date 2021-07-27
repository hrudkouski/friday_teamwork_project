import SuperInputText from "../../../n1-main/m1-ui/u3-common/Super-Components/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/u3-common/Super-Components/c2-SuperButton/SuperButton";

export const NewPassword = () => {
    return (
        <form>
            <div>
                <label htmlFor="password">New Password</label>
                <SuperInputText type="password"/>
            </div>
            <div>
                <label htmlFor="password">Repeat Password</label>
                <SuperInputText type="password"/>
            </div>
            <SuperButton type="submit">Submit</SuperButton>
        </form>
    )
}