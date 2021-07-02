import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from "./authReducer";
import {appReducer} from "./appReducer";
import {forgotReducer} from "../../d2-features/f1-auth/a3-forgot/f-2-bll/b-2-redux/forgotReducer";
import { loginRegisterReducer } from './loginReducer';


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    loginRegister: loginRegisterReducer,
    forgot: forgotReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;