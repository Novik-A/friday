import { Router } from 'react-router-dom';
import {Dispatch} from 'redux'
import {loginAPI, LoginParamsType, ResponseLoginType } from '../dal/api-login';
import {registerAPI, RegisterParamsType, ResponseRegisterType} from "../dal/api-register";
import { setIsLoggedInAC } from './authReducer';
import { push } from 'react-router-redux';


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
    isRegistered: false
}

export const loginRegisterReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/LOGIN':
            return {...state, userData: action.loginResponse}
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
    loginAPI.login(loginData)
        .then(res => {
            dispatch(loginAC(res.data))
            dispatch(setIsLoggedInAC(true))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', error)
        })
}

export const registerTC = (registerData: RegisterParamsType) => (dispatch: Dispatch<ActionsType>) => {
    registerAPI.register(registerData).then(res => {
        dispatch(registerAC())
        dispatch(isRegisteredAC(true))
    }).catch((e) => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        console.log('Error: ', error)
    })
}

// types
type InitialStateType = {
    userData: ResponseLoginType
    isRegistered: boolean
}
type RegisterActionType = ReturnType<typeof registerAC>
type loginActionType = ReturnType<typeof loginAC>
type IsRegisteredActionType = ReturnType<typeof isRegisteredAC>
type ActionsType = loginActionType | RegisterActionType | setIsLoggedInAC | IsRegisteredActionType
