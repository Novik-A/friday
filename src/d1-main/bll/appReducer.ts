import { AxiosError } from 'axios';
import {Dispatch} from 'redux'
import {authAPI} from "../dal/api";
import {loginAPI} from "../dal/api-login";
import {forgotError} from "../../d2-features/f1-auth/a3-forgot/f-2-bll/b-2-redux/forgotReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

// actions
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status}) as const
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error}) as const
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS-INITIALIZED', isInitialized}) as const

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    loginAPI.me().then(res => {
        // if (res.data.resultCode === 0) {
            // dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        console.log(res)
        // } else {
            // handleServerAppError(dispatch, res.data)
        // }
    })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console');
            console.log('Error: ', error)
            dispatch(forgotError(error))
            dispatch(setAppStatusAC('failed'))
        }).finally(() => {
        dispatch(setIsInitializedAC(true))
    })
}

// types
export type InitialStateType = typeof initialState
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedActionType = ReturnType<typeof setIsInitializedAC>

type ActionsType =
    | SetAppStatusActionType
    | SetAppErrorActionType
    | SetIsInitializedActionType