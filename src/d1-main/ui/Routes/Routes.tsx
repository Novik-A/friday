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

export const PATH = {
    MAIN: "/main",
    LOGIN: "/login",
    REGISTER: "/register",
    TEST: "/test",
    FORGOT: "/forgot",
    SET_PASS: "/set-new-password/:token",
    PROFILE: "/profile",
}

export const Routes = () => {
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
                <Route render={() => <Error404/>}/>

            </Switch>
        </div>
    );
}
