import SuperInputText from "../../../n1-main/m1-ui/u3-common/Super-Components/c1-SuperInputText/SuperInputText"
import SuperButton from "../../../n1-main/m1-ui/u3-common/Super-Components/c2-SuperButton/SuperButton"

export const RecoveryPassword = () => {
    return (
        <form>
            <div>
                <label htmlFor="email">Email Address</label>
                <SuperInputText type="email"/>
            </div>
            <SuperButton type="submit">Submit</SuperButton>
        </form>
    )
}