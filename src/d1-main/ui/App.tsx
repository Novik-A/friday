import React from 'react';
import './App.css';
import {useSelector} from "react-redux";
import {Header} from "./Header/Header";
import {Routes} from "./Routes/Routes";
import {AppRootStateType} from '../bll/store';
import {RequestStatusType} from "../bll/appReducer";

const App = () => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    // const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginRegister.isLoggedIn)
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(initializeAppTC())
    // }, [])

    return (
        <div className="App">
            <Header isLoggedIn={isLoggedIn}/>
            <Routes/>
            {status === 'loading' && <div>LOADING...</div>}
        </div>
    );
}

export default App;
