import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {Header} from "./Header/Header";
import {Routes} from "./Routes/Routes";
import {AppRootStateType} from '../bll/store';
import {initializeAppTC, RequestStatusType} from "../bll/appReducer";
import {Preloader} from "./components/c-1 Preloader/Preloader";

const App = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!isInitialized) dispatch(initializeAppTC())
    }, [dispatch, isInitialized])

    if (!isInitialized) return <Preloader left={'40%'} top={'40%'} size={'200px'}/>

    return (
        <div className="App">
            <Header isLoggedIn={isLoggedIn}/>
            <Routes/>
            {status === 'loading' && <Preloader left={'40%'} top={'40%'} size={'200px'}/>}
        </div>
    );
}

export default App;
