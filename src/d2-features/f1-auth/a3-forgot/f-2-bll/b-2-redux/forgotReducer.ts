import {Dispatch} from "redux";
import {ForgotAPI, ForgotParamsType, SetPassParamsType} from "../../f-3-dal/ForgotAPI";
import {setAppStatusAC, SetAppStatusActionType} from "../../../../../d1-main/bll/appReducer";

const FORGOT_LOADING = 'FORGOT/LOADING';
const FORGOT_ERROR = 'FORGOT/ERROR';
const FORGOT_SUCCESS = 'FORGOT/SUCCESS';
const SET_PASS_SUCCESS = 'SET_PASS/SUCCESS';

const forgotInitialState = {
    linkSent: false,
    setNewPass: false,
    email: '',
    error: ''
};

export const forgotReducer = (state: InitialStateType = forgotInitialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case FORGOT_SUCCESS:
            return {
                ...state,
                linkSent: true,
                email: action.email
            }
        case FORGOT_ERROR:
            return {...state, error: action.error}
        case SET_PASS_SUCCESS:
            return {...state, setNewPass: true}
        default:
            return state
    }
};

// actions
export const forgotSuccess = (email: string) =>
    ({type: FORGOT_SUCCESS, email} as const)
export const forgotError = (error: string) =>
    ({type: FORGOT_ERROR, error} as const)
export const setPassSuccess = () =>
    ({type: SET_PASS_SUCCESS} as const)

// thunks
export const forgotTC = (email: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    const forgotData: ForgotParamsType = {
        email: email,
        from: "test-front-admin <ai73a@yandex.by>",
        message: `<div style="background-color: lime; padding: 15px">password recovery link: 
                <a href='http://localhost:3000/#/set-new-password/$token$'>link</a></div>`
    }
    ForgotAPI.forgot(forgotData)
        .then(res => {
            dispatch(forgotSuccess(forgotData.email))
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

export const setPassTC = (data: SetPassParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    ForgotAPI.setPass(data)
        .then(res => {
            dispatch(setPassSuccess())
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


// types
type InitialStateType = typeof forgotInitialState
export type FogotErrorActionType = ReturnType<typeof forgotError>

type ActionsType = ReturnType<typeof forgotSuccess>
    | FogotErrorActionType
    | ReturnType<typeof setPassSuccess>
    | SetAppStatusActionType