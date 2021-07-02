import { Router } from 'react-router-dom';
import {Dispatch} from 'redux'
import {loginAPI, LoginParamsType, ResponseLoginType } from '../dal/api-login';
import {registerAPI, RegisterParamsType, ResponseRegisterType} from "../dal/api-register";
import { setIsLoggedInAC } from './authReducer';
import { push } from 'react-router-redux';
import {setAppStatusAC, SetAppStatusActionType} from "./appReducer";
import {FogotErrorActionType, forgotError} from "../../d2-features/f1-auth/a3-forgot/f-2-bll/b-2-redux/forgotReducer";


let defaultDate: Date = new Date();
const initialState = {
    userData: {
        _id: "",
        email: "",
        name: "",
        avatar: "",
        publicCardPacksCount: 0,
        created: defaultDate,
        updated: defaultDate,
        isAdmin: false,
        verified: false,
        rememberMe: false,
        error: ""
    },
    isRegistered: false,
    isLoggedIn: false
}

export const loginRegisterReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/LOGIN':
            return {...state, userData: action.loginResponse, isLoggedIn: true}
        case "AUTH/IS_REGISTERED": {
            return  {...state, isRegistered: action.isRegistered}
        }
        default:
            return state
    }
}

// actions
export const loginAC = (loginResponse: ResponseLoginType) => ({type: 'AUTH/LOGIN', loginResponse} as const)
export const isRegisteredAC = (isRegistered: boolean) => ({type: 'AUTH/IS_REGISTERED', isRegistered} as const)
export const registerAC = () => ({type: 'AUTH/REGISTER'} as const)

// thunks
export const loginTC = (loginData: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    loginAPI.login(loginData)
        .then(res => {
            dispatch(loginAC(res.data))
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', error)
            dispatch(forgotError(error))
            dispatch(setAppStatusAC('failed'))
        })
}

export const registerTC = (registerData: RegisterParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    registerAPI.register(registerData).then(res => {
        dispatch(registerAC())
        dispatch(isRegisteredAC(true))
        dispatch(setAppStatusAC('succeeded'))
    }).catch((e) => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log('Error: ', error)
        dispatch(forgotError(error))
        dispatch(setAppStatusAC('failed'))
    })
}

// types
type InitialStateType = {
    userData: ResponseLoginType
    isRegistered: boolean
    isLoggedIn: boolean
}
type RegisterActionType = ReturnType<typeof registerAC>
type loginActionType = ReturnType<typeof loginAC>
type IsRegisteredActionType = ReturnType<typeof isRegisteredAC>
type ActionsType = loginActionType | RegisterActionType | setIsLoggedInAC
    | IsRegisteredActionType | SetAppStatusActionType | FogotErrorActionType
