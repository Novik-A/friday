import {Dispatch} from 'redux'
import {loginAPI, LoginParamsType, ResponseLoginType } from '../dal/api-login';

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
    }
}

export const loginRegisterReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/LOGIN':
            return {...state, userData: action.loginResponse}
        default:
            return state
    }
}

// actions
export const loginAC = (loginResponse: ResponseLoginType) => ({type: 'AUTH/LOGIN', loginResponse} as const)

// thunks

export const loginTC = (loginData: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {

    loginAPI.login(loginData)
        .then(res => {
            dispatch(loginAC(res.data))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', error)
        })
}

// types
type InitialStateType = {
    userData: ResponseLoginType
}
type loginActionType = ReturnType<typeof loginAC>
type ActionsType = loginActionType
