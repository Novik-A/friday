import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {Error404} from "../common/c4-Error404/Error404";
import {Login} from "../../../d2-features/f1-auth/a1-login/Login";
import {Register} from "../../../d2-features/f1-auth/a2-register/Register";
import {TestPage} from "../../../d2-features/f0-test/TestPage";
import {Main} from "../Main/Main";
import ForgotPage from "../../../d2-features/f1-auth/a3-forgot/f-1-ui/ForgotPage";
import SetPass from "../../../d2-features/f1-auth/a3-forgot/f-1-ui/SetPass";
import {Profile} from "../Profile/Profile";
import TableContainer from "../../../d2-features/tabels/TableContainer";
import CardsContainer from "../../../d2-features/cards/CardsContainer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../bll/store";

export const PATH = {
    MAIN: "/main",
    LOGIN: "/login",
    REGISTER: "/register",
    TEST: "/test",
    FORGOT: "/forgot",
    SET_PASS: "/set-new-password/:token",
    PROFILE: "/profile",
    PACKS: "/packs",
    CARDS: "/cards"
}

export const Routes = () => {
    const userId = useSelector<AppRootStateType, string>( state => state.loginRegister.userData._id)
    return (
        <div>
            <Switch>
                <Route path={"/"} exact render={() => <Redirect to={PATH.MAIN}/>}/>
                <Route path={PATH.MAIN} render={() => <Main/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTER} render={() => <Register/>}/>
                <Route path={PATH.FORGOT} render={() => <ForgotPage/>}/>
                <Route path={PATH.SET_PASS} render={() => <SetPass/>}/>
                <Route path={PATH.PROFILE} render={() => <Profile/>}/>
                <Route path={PATH.TEST} render={() => <TestPage/>}/>
                <Route path={PATH.PACKS} render={() => <TableContainer userId={userId}/>}/>
                <Route path={PATH.CARDS} render={() => <CardsContainer/>}/>
                <Route render={() => <Error404/>}/>

            </Switch>
        </div>
    );
}
