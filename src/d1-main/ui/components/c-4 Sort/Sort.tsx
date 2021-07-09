import React, {useState} from 'react'
import s from './Sort.module.css'

type SortPropsType = {
    sortValue: any
    isFetching: boolean
    onClick: (payload?: any) => void
}

export const Sort: React.FC<SortPropsType> = ({sortValue, onClick, isFetching}) => {
    const [arrowDirection, setArrowDirection] = useState(1)

    const onClickHandler = () => {
        if(!isFetching) {
            arrowDirection === 0 ? setArrowDirection(1) : setArrowDirection(0)
            onClick(`${arrowDirection}${sortValue}`)
        }
    }

    return (
        <>
            {arrowDirection === 0 ?
                <span className={s.ratingArrow} onClick={onClickHandler}>
                                        &uArr;</span> :
                <span className={s.ratingArrow} onClick={onClickHandler}>
                                        &dArr;</span>}
        </>

    )
}