import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {authReducer} from "./authReducer";
import {appReducer} from "./appReducer";
import { loginRegisterReducer } from './loginReducer';


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    loginRegister: loginRegisterReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
