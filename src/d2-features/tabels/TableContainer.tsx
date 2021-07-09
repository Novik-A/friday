import React, {useCallback, useEffect} from "react";
import {
    createPackTC,
    getPackTC,
    removePackTC,
    updatePackTC
} from "../../d1-main/bll/tablesReducer";
import Table from "./Tables";
import {useDispatch, useSelector} from "react-redux";
import {CardsPackType, CreateParamsType, UpdateCardsPackType} from "../../d1-main/dal/api-tabels";
import {AppRootStateType} from "../../d1-main/bll/store";
import {getCardsTC} from "../../d1-main/bll/cardsReducer";
import {Redirect} from "react-router";



const TableContainer = () => {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginRegister.isLoggedIn)

    let packs = useSelector<AppRootStateType, Array<CardsPackType>>(state => state.tablesReducer.cardPacks)
    const getPack = useCallback(function () {
        const thunk = getPackTC()
        dispatch(thunk)
    }, [])
    const getCards = useCallback(function (id: string) {
        const thunk = getCardsTC({cardsPack_id: id})
        dispatch(thunk)
    }, [])
    const createPack = useCallback(function (newPackData: CreateParamsType) {
        const thunk = createPackTC(newPackData)
        dispatch(thunk)
    }, [])
    const removePack = useCallback(function (id: string) {
        const thunk = removePackTC(id)
        dispatch(thunk)
    }, [])
    const updatePack = useCallback(function (updateData: UpdateCardsPackType) {
        const thunk = updatePackTC(updateData)
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
        />
    </div>
}
export default TableContainer;
