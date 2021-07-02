import {Dispatch} from 'redux'
import {authAPI} from "../dal/api";

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLogged}
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (isLogged: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', isLogged} as const)

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
export type setIsLoggedInAC = ReturnType<typeof setIsLoggedInAC>
type ActionsType = setIsLoggedInAC
