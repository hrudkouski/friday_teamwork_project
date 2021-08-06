import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {LoginActionsType, loginReducer} from "../../../n2-features/f1-auth/a1-login/login-reducer";
import {RegisterActionsType, registerReducer} from "../../../n2-features/f1-auth/a2-register/register-reducer";
import {recoveryPasswordReducer} from "../../../n2-features/f1-auth/a3-recoveryPassword/recoveryPassword-reducer";
import {newPasswordReducer} from "../../../n2-features/f1-auth/a4-new-password/newPassword-reducer";
import {profileReducer} from "../../../n2-features/f1-auth/a5-profile/profile-reducer";
import {AppActionsType, appReducer} from "../../m1-ui/u1-app/app-reducer";
import {PacksActionsType, packsReducer} from "../../m1-ui/u2-components/Packs/packs-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    register: registerReducer,
    recoveryPassword: recoveryPasswordReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
    packs: packsReducer
})

export type AppActionType =
    | RegisterActionsType
    | LoginActionsType
    | AppActionsType
    | PacksActionsType;

export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType,
    AppRootStateType,
    unknown,
    AppActionType>

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store // for dev