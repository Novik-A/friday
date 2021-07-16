import {Dispatch} from 'redux'
import {
    cardsAPI,
    CardType,
    CreateCardParamsType,
    GetCardsParams,
    ResponseCardsType,
    UpdateCardType
} from '../dal/api-cards'
import {setAppStatusAC} from "./appReducer";

const initialState = {
    cards: [
        {
            answer: "no answer",
            question: "no question",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            rating: 0,
            shots: 1,
            type: "card",
            user_id: "142151531535151",
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13T11:05:44.867Z",
            __v: 0,
            _id: "5ebbd48876810f1ad0e7ece3"
        },
    ],
    cardsTotalCount: 3,
    maxGrade: 4.987525071790364,
    minGrade: 2.0100984354076568,
    page: 1,
    pageCount: 4,
    packUserId: "5eecf82a3ed8f700042f1186"
}

export const cardReducer = (state: ResponseCardsType = initialState, action: ActionsCardsType) => {
    switch (action.type) {
        case "GET_CARDS": {
            return {...action.cards}
        }
        case "CREATE_NEW_CARD": {
            let newState = state
            newState.cards.push(action.card)
            return {...newState}
        }
    }
    return state
}

const getCardsAC = (cards: ResponseCardsType) => ({type: "GET_CARDS", cards} as const)
const addCardAC = (card: CardType) => ({type: "CREATE_NEW_CARD", card} as const)

export type GetCardsActionType = ReturnType<typeof getCardsAC>
export type CreateCardActionType = ReturnType<typeof addCardAC>
export type ActionsCardsType = GetCardsActionType | CreateCardActionType

export const getCardsTC = (getParams: GetCardsParams) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.getCards(getParams).then( res => {
            dispatch(getCardsAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
        }
    )
}
export const createCardTC = (createData: CreateCardParamsType, getParams: GetCardsParams) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.createCard(createData).then( res => {
            dispatch(addCardAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
        }
    ).then( () => {
            dispatch(setAppStatusAC('loading'))
            cardsAPI.getCards(getParams).then(res => {
                    dispatch(getCardsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
                }
            )
        }
    )
}
export const removeCardTC = (id: string, cardsPack_id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.deleteCard(id).then(() =>
        cardsAPI.getCards({cardsPack_id}).then(res => {
                dispatch(getCardsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
            }
        )
    )
}
export const updateCardTC = (updateData: UpdateCardType, cardsPack_id: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.updateCard(updateData).then( () =>
        cardsAPI.getCards({cardsPack_id}).then(res => {
                dispatch(getCardsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
            }
        )
    )
}
