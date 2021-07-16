import React from 'react';
import {Modal} from "./Modal";
import SuperButton from "../../common/c2-SuperButton/SuperButton";

type ModalType = {
    open: boolean
    value: string
    title: string
    close: () => void
    onClick: () => void
}

export const DeleteModal: React.FC<ModalType> = (
    {open, close, value, onClick, title}
) => {
    return <Modal title={title} isOpen={open} close={close}>
        <div>{value}</div>
        <div>
            <SuperButton width={"150px"} onClick={close}>Cancel</SuperButton>
            <SuperButton width={"150px"} onClick={onClick}>Delete</SuperButton>
        </div>
    </Modal>
}