import React, {useCallback} from "react";
import {createPackTC, getPackTC, removePackTC, updatePackTC} from "../../d1-main/bll/tablesReducer";
import Table from "./Tables";
import {useDispatch, useSelector} from "react-redux";
import {CardsPackType, CreateParamsType, GetPackParams, UpdateCardsPackType} from "../../d1-main/dal/api-tabels";
import {AppRootStateType} from "../../d1-main/bll/store";
import {getCardsTC} from "../../d1-main/bll/cardsReducer";
import {Redirect} from "react-router";

type PropsType = {
    userId?: string
}

const TableContainer = (props: PropsType) => {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginRegister.isLoggedIn)

    let packs = useSelector<AppRootStateType, Array<CardsPackType>>(state => state.tablesReducer.cardPacks)
    const getPack = useCallback(function (getPackParams: GetPackParams) {
        const thunk = getPackTC(getPackParams)
        dispatch(thunk)
    }, [])
    const getCards = useCallback(function (id: string) {
        const thunk = getCardsTC({cardsPack_id: id})
        dispatch(thunk)
    }, [])
    const createPack = useCallback(function (newPackData: CreateParamsType, getPackParams: GetPackParams) {
        const thunk = createPackTC(newPackData, getPackParams)
        dispatch(thunk)
    }, [])
    const removePack = useCallback(function (id: string, getPackParams: GetPackParams) {
        const thunk = removePackTC(id, getPackParams)
        dispatch(thunk)
    }, [])
    const updatePack = useCallback(function (updateData: UpdateCardsPackType, getPackParams: GetPackParams) {
        const thunk = updatePackTC(updateData, getPackParams)
        dispatch(thunk)
    }, [])

    if(!isLoggedIn) {
        return <Redirect to={'/login'} />
    }

    return  <div>
        <Table
            packs={packs}
            getPack={getPack}
            getCards={getCards}
            createPack={createPack}
            removePack={removePack}
            updatePack={updatePack}
            userId={props.userId}
        />
    </div>
}
export default TableContainer;
