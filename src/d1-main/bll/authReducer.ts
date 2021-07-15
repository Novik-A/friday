import {Dispatch} from 'redux'
import {setAppStatusAC, SetAppStatusActionType} from "./appReducer";
import {ForgotErrorActionType, forgotError} from "./forgotReducer";
import {authAPI, LoginParamsType, RegisterParamsType, ResponseLoginType} from "../dal/api";


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

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/LOGIN':
            return {...state, userData: action.loginResponse, isLoggedIn: true}
        case "AUTH/IS_REGISTERED": {
            return  {...state, isRegistered: action.isRegistered}
        }
        case 'AUTH/SET_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

// actions
export const loginAC = (loginResponse: ResponseLoginType) => ({type: 'AUTH/LOGIN', loginResponse} as const)
export const isRegisteredAC = (isRegistered: boolean) => ({type: 'AUTH/IS_REGISTERED', isRegistered} as const)
export const registerAC = () => ({type: 'AUTH/REGISTER'} as const)
export const setIsLoggedInAC = (value: boolean) => ({type: 'AUTH/SET_IS_LOGGED_IN', value} as const)

// thunks
export const loginTC = (loginData: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(loginData)
        .then(res => {
            dispatch(loginAC(res.data))
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
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
                dispatch(setIsLoggedInAC(false))
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
    authAPI.register(registerData).then(res => {
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
type ActionsType = loginActionType | RegisterActionType | ReturnType<typeof setIsLoggedInAC>
    | IsRegisteredActionType | SetAppStatusActionType | ForgotErrorActionType
