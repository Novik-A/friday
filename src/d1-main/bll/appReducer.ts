import { AxiosError } from 'axios';
import {Dispatch} from 'redux'
import {authAPI} from "../dal/api";

const initialState = {
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-IS-INITIALIZED':
            return {...state}
        default:
            return state
    }
}

// actions
export const setIsInitialized = () =>
    ({type: 'APP/SET-IS-INITIALIZED'} as const)

// thunks

export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    authAPI.me().then(res => {

    })
        .catch((err: AxiosError) => {

        })
        .finally(() => {

    })
}

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setIsInitialized>