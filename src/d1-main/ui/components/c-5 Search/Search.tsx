import React, {useState} from 'react'
import SuperInputText from '../../common/c1-SuperInputText/SuperInputText'
import s from './Search.module.css'
import {GetPackParams} from "../../../dal/api-tabels";


type SearchPropsType = {
    searchCallback: (getPackParams: GetPackParams) => void
    disabled?: boolean
}

export const Search: React.FC<SearchPropsType> = ({searchCallback, disabled = false}) => {

    const [searchText, setSearchText] = useState('')

    const onEnterCB = () => {
        if (!disabled) {
            searchCallback({packName: searchText})
        }
    }

    return (
        <div className={s.searchBar}>
            <SuperInputText className={s.searchBarInput}
                            placeholder={'Search...'}
                            onChangeText={setSearchText}
                            onEnter={onEnterCB}/>
            <button className={s.searchBarBtn} onClick={onEnterCB} disabled={disabled}/>
        </div>
    )
}
