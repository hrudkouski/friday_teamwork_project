import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {loginReducer} from "../../../n2-features/f1-auth/a1-login/login-reducer";
import { registerReducer } from "../../../n2-features/f1-auth/a2-register/register-reducer";


const rootReducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>