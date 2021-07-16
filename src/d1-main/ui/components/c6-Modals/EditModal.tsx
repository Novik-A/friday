import React, {ChangeEvent} from 'react';
import {Modal} from "./Modal";
import SuperButton from "../../common/c2-SuperButton/SuperButton";
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";

type ModalType = {
    title: string
    label: string
    labelTwo?: string
    open: boolean
    close: () => void
    error: string
    errorTwo?: string
    value: string
    valueTwo?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeTwo?: (e: ChangeEvent<HTMLInputElement>) => void
    onClick: () => void
}

export const EditModal: React.FC<ModalType> = (
    {
        title, open, close, error, errorTwo, value,
        valueTwo, label, labelTwo, onChange, onChangeTwo, onClick
    }
) => {
    return <Modal title={title} isOpen={open} close={close}>
        <SuperInputText label={label}
                        value={value}
                        error={error}
                        onChange={onChange}/>
        {labelTwo && <SuperInputText label={labelTwo}
                        value={valueTwo}
                        error={errorTwo}
                        onChange={onChangeTwo}/>}
        <div>
            <SuperButton width={"150px"} onClick={close}>Cancel</SuperButton>
            <SuperButton width={"150px"} onClick={onClick}>Save</SuperButton>
        </div>
    </Modal>
}