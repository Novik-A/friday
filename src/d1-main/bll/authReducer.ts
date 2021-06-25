import {Dispatch} from 'redux'
import {authAPI} from "../dal/api";

const initialState = {
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state}
        default:
            return state
    }
}

// actions
export const setIsLoggedIn = () =>
    ({type: 'AUTH/SET-IS-LOGGED-IN'} as const)

// thunks

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {

    authAPI.logout()
        .then(res => {

        })
        .catch((error) => {

        })
}

// types
type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof setIsLoggedIn>