import React from 'react';
import preloader from '../../assets/images/preloader.gif'

type PreloaderPropsType = {
    left?: string
    top?: string
    size?: string
}


export function Preloader(props: PreloaderPropsType) {
    const preloaderStyle: {} = {
        width: props.size ? props.size : '100px',
        height: props.size ? props.size : '100px',
        position: 'absolute',
        left: props.left ? props.left : '40px',
        top: props.top ? props.top : '40px',
        zIndex: 1000
    }

    return (
        <div>
            <img style={preloaderStyle} src={preloader} alt="Preloader"/>
        </div>
    )
}