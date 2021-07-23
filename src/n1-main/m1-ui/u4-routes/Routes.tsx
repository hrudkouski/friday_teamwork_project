import {Route, Switch} from "react-router-dom";
import {Login} from "../../../n2-features/f1-auth/a1-login/Login";
import {RecoveryPassword} from "../../../n2-features/f1-auth/a3-recoveryPassword/RecoveryPassword";
import {NewPassword} from "../../../n2-features/f1-auth/a4-new-password/NewPassword";
import {Test} from "../../../n2-features/f0-test/Test";
import {Error404} from "../../../n2-features/f3-error/Error404";
import { Profile } from "../u2-components/Profile/Profile";
import { Register } from "../../../n2-features/f1-auth/a2-register/Register";

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route path={'/register'} render={() => <Register/>}/>
                <Route path={'/profile'} render={() => <Profile/>}/>
                <Route path={'/recovery'} render={() => <RecoveryPassword/>}/>
                <Route path={'/new-password'} render={() => <NewPassword/>}/>
                <Route path={'/test'} render={() => <Test/>}/>
                <Route render={() => <Error404/>}/>
            </Switch>
        </div>
    )
}