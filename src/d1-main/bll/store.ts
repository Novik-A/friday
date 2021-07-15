import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import {appReducer} from "./appReducer";
import {forgotReducer} from "./forgotReducer";
import {authReducer} from './authReducer';
import {tablesReducer} from './tablesReducer';
import {cardReducer} from './cardsReducer';


const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    forgot: forgotReducer,
    tablesReducer: tablesReducer,
    cardReducer: cardReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
