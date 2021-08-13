import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "../../../n2-features/f1-auth/a1-login/Login";
import {RecoveryPassword} from "../../../n2-features/f1-auth/a3-recoveryPassword/RecoveryPassword";
import {NewPassword} from "../../../n2-features/f1-auth/a4-new-password/NewPassword";
import {Test} from "../../../n2-features/f0-test/Test";
import {Error404} from "../../../n2-features/f3-error/Error404";
import {Profile} from "../u2-components/Profile/Profile";
import {Register} from "../../../n2-features/f1-auth/a2-register/Register";
import {Packs} from "../u2-components/Packs/Packs";
import {Cards} from "../u2-components/Packs/Cards/Cards";
import {Learn} from "../u2-components/Learn/Learn";

export const PATH = {
    LOGIN: '/login',
    REGISTRATION: '/register',
    PROFILE: '/profile',
    RECOVERY_PASSWORD: '/recovery',
    NEW_PASSWORD: '/new-password',
    PACKS_LIST: '/packList',
    CARDS: '/cards',
    LEARN: '/learn',
    TEST: '/test',
    ERROR_404: '/404',
    UNKNOWN_PAGE: '*',
}

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route exact path={'/'} render={() => <Redirect to={PATH.LOGIN}/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTRATION} render={() => <Register/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.RECOVERY_PASSWORD} render={() => <RecoveryPassword/>}/>
                <Route path={`${PATH.NEW_PASSWORD}/:token`} render={() => <NewPassword/>}/>
                <Route path={PATH.PACKS_LIST} render={() => <Packs/>}/>
                <Route path={PATH.CARDS + `/:id`} render={() => <Cards/>}/>
                <Route path={PATH.LEARN + `/:id`} render={() => <Learn/>}/>
                <Route path={PATH.TEST} render={() => <Test/>}/>
                <Route path={PATH.ERROR_404} render={() => <Error404/>}/>
                <Redirect from={PATH.UNKNOWN_PAGE} to={PATH.ERROR_404}/>
            </Switch>
        </div>
    )
}