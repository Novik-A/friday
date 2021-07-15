import React, {ChangeEvent} from 'react';
import {Modal} from "./Modal";
import SuperInputText from "../../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../common/c2-SuperButton/SuperButton";

type ModalType = {
    open: boolean
    close: () => void
    error: string
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onClick: () => void
}

export const AddPackModal: React.FC<ModalType> =(
    {open, close, error, value, onChange, onClick}
) => {
    return <Modal closeBtn={true} title={"Add new pack"} isOpen={open} close={close}>
        <SuperInputText placeholder={"Name pack"}
                        value={value}
                        error={error}
                        onChange={onChange}/>
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