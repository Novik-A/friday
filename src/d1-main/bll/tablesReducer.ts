import {Dispatch} from 'redux'
import {
    CardsPackType,
    CreateParamsType,
    GetPackParams,
    ResponsePacksType,
    tablesAPI,
    UpdateCardsPackType
} from '../dal/api-tabels'
import {AppRootStateType} from './store'

const initialState = {
    cardPacks: [
        {
            _id: "5eb6cef840b7bf1cf0d8122d",
            user_id: "5eb543f6bea3ad21480f1ee7",
            name: "no Name",
            path: "/def",
            cardsCount: 25,
            grade: 0,
            shots: 0,
            rating: 0,
            type: "pack" as const,
            created: "2020-05-09T15:40:40.339Z",
            updated: "2020-05-09T15:40:40.339Z",
            __v: 0
        },
    ],
    cardPacksTotalCount: 14,
    maxCardsCount: 4,
    minCardsCount: 0,
    page: 1,
    pageCount: 4,
    token: '',
    tokenDeathTime: 0,
    sortPacks: '',
    packName: '',
    minParam: 0,
    maxParam: 103,
    user_id: ''
}

export const tablesReducer = (state: ResponsePacksType = initialState, action: ActionsTableType): ResponsePacksType => {
    switch (action.type) {
        case "GET_PACKS": {
            return {...action.packs}
        }
        case "CREATE_NEW_PACK": {
            let newState = state
            newState.cardPacks.push(action.pack)
            return {...newState}
        }
        case 'UPDATE_VALUES':
            return {...state, ...action.payload}
    }
    return state
}

const getPackAC = (packs: ResponsePacksType) => ({type: "GET_PACKS", packs} as const)
const addPackAC = (pack: CardsPackType) => ({type: "CREATE_NEW_PACK", pack} as const)
export const updateValuesAC = (payload: SetValuesType) => ({
    type: 'UPDATE_VALUES',
    payload
} as const)


export type GetPackActionType = ReturnType<typeof getPackAC>
export type CreatePackActionType = ReturnType<typeof addPackAC>
export type ActionsTableType = GetPackActionType | CreatePackActionType | ReturnType<typeof updateValuesAC>

export const getPackTC = (params: GetPackParams = {}) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const tablesReducer = getState().tablesReducer
    const cardsParamsModel: GetPackParams = {
        packName: tablesReducer.packName,
        min: tablesReducer.minParam,
        max: tablesReducer.maxParam,
        sortPacks: tablesReducer.sortPacks,
        page: tablesReducer.page,
        pageCount: tablesReducer.pageCount,
        user_id: tablesReducer.user_id,
        ...params
    }
    tablesAPI.getCardsPack(cardsParamsModel).then(res => {
            dispatch(getPackAC(res.data))
        }
    )
}

export const createPackTC = (newPackData: CreateParamsType, getPackParams: GetPackParams) => (dispatch: Dispatch) => {
    tablesAPI.createCardsPack(newPackData).then(res => {
            dispatch(addPackAC(res.data))
        }
    ).then(() =>
        tablesAPI.getCardsPack(getPackParams).then(res => {
                dispatch(getPackAC(res.data))
            }
        )
    )
}
export const removePackTC = (id: string, getPackParams: GetPackParams) => (dispatch: Dispatch) => {
    tablesAPI.deletePack(id).then(() =>
        tablesAPI.getCardsPack(getPackParams).then(res => {
                dispatch(getPackAC(res.data))
            }
        )
    )
}
export const updatePackTC = (updateData: UpdateCardsPackType, getPackParams: GetPackParams) => (dispatch: Dispatch) => {
    tablesAPI.updatePack(updateData).then(() =>
        tablesAPI.getCardsPack(getPackParams).then(res => {
                dispatch(getPackAC(res.data))
            }
        )
    )
}

export type SetValuesType = {
    minCardsCount?: number,
    maxCardsCount?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number,
    packName?: string,
    user_id?: string
}