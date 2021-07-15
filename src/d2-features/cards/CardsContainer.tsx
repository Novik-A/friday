import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../d1-main/bll/store";
import Cards from "./Cards";
import {CardType, CreateCardParamsType, GetCardsParams, UpdateCardType} from "../../d1-main/dal/api-cards";
import {createCardTC, getCardsTC, removeCardTC, updateCardTC} from "../../d1-main/bll/cardsReducer";
import {Redirect} from "react-router";

type PropsType = {
    packId?: string
}

const CardsContainer = (props: PropsType) => {

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    let cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cardReducer.cards)
    const getCards = useCallback(function (id: string) {
        const thunk = getCardsTC({cardsPack_id: id})
        dispatch(thunk)
    }, [])
    const createCard = useCallback(function (createData: CreateCardParamsType, getParams: GetCardsParams) {
        const thunk = createCardTC(createData, getParams)
        dispatch(thunk)
    }, [])
    const removeCard = useCallback(function (id: string, cardsPack_id: string) {
        const thunk = removeCardTC(id, cardsPack_id)
        dispatch(thunk)
    }, [])
    const updateCard = useCallback(function (updateData: UpdateCardType, cardsPack_id: string) {
        const thunk = updateCardTC(updateData, cardsPack_id)
        dispatch(thunk)
    }, [])

    if(!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    return  <div>
        <Cards
            cards={cards}
            getCards={getCards}
            createCard={createCard}
            removeCard={removeCard}
            updateCard={updateCard}
            packId={props.packId}
        />
    </div>
}
export default CardsContainer;
