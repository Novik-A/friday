import React, {ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent} from 'react';
import s from './Modal.module.css'

type DefaultModalPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ModalPropsType = DefaultModalPropsType & {
    children?: React.ReactNode
    title?: string
    isOpen: boolean
    close: () => void
}

export const Modal: React.FC<ModalPropsType> = (
    {   close,
        isOpen,
        title,
        children,
        className,
        ...restProps

    }

) => {

    return (<>
            {isOpen &&
            <div className={s.wrapper} onClick={close}>
                <div className={s.form__block} onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                    <div className={s.title__wrapper}>
                        <h4 className={s.title}>{title}</h4>
                        <button className={s.button} onClick={close}>
                            <span className={s.button__line + ' ' + s.button__line_first}/>
                            <span className={s.button__line + ' ' + s.button__line_second}/>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
            }
        </>
    );
};