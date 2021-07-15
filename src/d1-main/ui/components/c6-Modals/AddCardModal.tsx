import React, {ChangeEvent} from 'react';
import {Modal} from "./Modal";
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/c2-SuperButton/SuperButton";

type ModalType = {
    open: boolean
    close: () => void
    errorQuestion: string
    errorAnswer: string
    valueQuestion: string
    valueAnswer: string
    onChangeQuestion: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeAnswer: (e: ChangeEvent<HTMLInputElement>) => void
    onClick: () => void
}

export const AddCardModal: React.FC<ModalType> =(
    {open, close, errorQuestion, errorAnswer, valueQuestion,
        valueAnswer, onChangeQuestion, onChangeAnswer, onClick}
) => {
    return <Modal closeBtn={true} title={"Add new card"} isOpen={open} close={close}>
        <SuperInputText placeholder={"Question"}
                        value={valueQuestion}
                        error={errorQuestion}
                        onChange={onChangeQuestion}/>
        <SuperInputText placeholder={"Answer"}
                        value={valueAnswer}
                        error={errorAnswer}
                        onChange={onChangeAnswer}/>
        <div>
            <SuperButton width={"150px"}
                         onClick={close}>
                Cancel
            </SuperButton>
            <SuperButton width={"150px"} onClick={onClick}>
                Save
            </SuperButton>
        </div>
    </Modal>;
}