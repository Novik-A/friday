import {instance} from "./base-url";


// api
export const tablesAPI = {
    getCardsPack(cardsParams: CardsParams) {
        return instance.get<ResponsePacksType>(`cards/pack`, {params: {...cardsParams}})
    },
    createCardsPack(createData: CreateParamsType) {
        return instance.post<CardsPackType>('cards/pack', {...createData})
    },
    deletePack(id: string) {
        return instance.delete<CardsPackType>('cards/pack', {params: {id}})
    },
    updatePack(updateData: UpdateCardsPackType) {
        return instance.put<CardsPackType>('cards/pack', {...updateData})
    }
}


// types
export type TypeCardsPackType = 'pack' | 'folder'
export type CardsPackType = {
    _id: string
    user_id: string
    name: string
    path: string// папка
    cardsCount: number
    grade: number // средняя оценка карточек
    shots: number // количество попыток
    rating: number // лайки
    type: TypeCardsPackType
    created: string
    updated: string
    __v: number
}
export type UpdateCardsPackType = {
    _id: string
    name?: string
    path?: string// папка
    cardsCount?: number
    grade?: number // средняя оценка карточек
    shots?: number // количество попыток
    rating?: number // лайки
    type?: TypeCardsPackType
    created?: string
    updated?: string
    __v?: number
}
export type ResponsePacksType = {
    cardPacks: Array<CardsPackType>
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token?: string
    tokenDeathTime?: number
    sortPacks?: string
    packName?: string
    minParam?: number
    maxParam?: number
    user_id?: string
}

export type CreateParamsType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: TypeCardsPackType
}
export type CardsParams = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}