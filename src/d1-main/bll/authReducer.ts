import {Dispatch} from 'redux'
import {authAPI} from "../dal/api";

const initialState = {
    isLoggedIn: false,
    isAuth: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLogged}
        case "AUTH/SET-IS-AUTH": {
            return {...state, isAuth: action.isAuth}
        }
        default:
            return state
    }
}

// actions
export const setIsLoggedInAC = (isLogged: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', isLogged} as const)
export const setIsAuthAC = (isAuth: boolean) => ({type: 'AUTH/SET-IS-AUTH', isAuth} as const)


// thunks

export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {

    authAPI.logout()
        .then(res => {

        })
        .catch((error) => {

        })
}
export const setIsAuthTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        setIsAuthAC(true)
        if (res.status === 200) {
            setIsAuthAC(true)
        }
    }).catch(err => {
        alert(err.error)
    })
}

// types
type InitialStateType = typeof initialState
export type setIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>
export type setIsAuthActionType = ReturnType<typeof setIsAuthAC>
type ActionsType = setIsLoggedInActionType | setIsAuthActionType
