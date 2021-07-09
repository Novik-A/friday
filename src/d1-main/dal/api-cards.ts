import {instance} from "./base-url";


// api
export const cardsAPI = {
    getCards(paramsObj: GetCardsParams) {
        return instance.get<ResponseCardsType>(`cards/card`, {params: {...paramsObj}})
    },
    createCard(createData: CreateCardParamsType) {
        return instance.post<CardType>('cards/card', {...createData})
    },
    deleteCard(id: string) {
        return instance.delete<CardType>('cards/card', {params: {id}})
    },
    updateCard(updateData: UpdateCardType) {
        return instance.put<CardType>('cards/card', {...updateData})
    }
}


// types
export type GetCardsParams = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: number
    page?: number
    pageCount?: number
}

export type CardType = {
        answer: string
        question: string
        cardsPack_id: string
        grade: number
        rating: number
        shots: number
        type: string
        user_id: string
        created: string
        updated: string
        __v: number
        _id: string
}
export type UpdateCardType = {
    _id: string
    answer?: string
    question?: string
    cardsPack_id?: string
    grade?: number
    rating?: number
    shots?: number
    type?: string
    user_id?: string
    created?: string
    updated?: string
    __v?: number
    comments?: string
}
export type ResponseCardsType = {
    cards: Array<CardType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CreateCardParamsType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        rating?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
        type?: string
    }
}
