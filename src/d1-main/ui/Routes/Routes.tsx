import React from "react";
import {Redirect, Route, Switch } from "react-router-dom";
import {Error404} from "../common/c4-Error404/Error404";
import {Login} from "../../../d2-features/f1-auth/a1-login/Login";
import { Register } from "../../../d2-features/f1-auth/a2-register/Register";
import {TestPage} from "../../../d2-features/f0-test/TestPage";
import {Main} from "../Main/Main";
import {RestorePassword} from "../../../d2-features/f1-auth/a2-register/RestorePassword";
import {UpdatePassword} from "../../../d2-features/f1-auth/a2-register/UpdatePassword";

export const PATH = {
    MAIN: "/main",
    LOGIN: "/login",
    REGISTER: "/register",
    TEST: "/test",
    RESTORE_PASSWORD: "/restore",
    UPDATE_PASSWORD: "/update",
}

export const Routes = () => {
    return (
        <div>
            <Switch>
                <Route path={"/"} exact render={() => <Redirect to={PATH.MAIN}/>}/>
                <Route path={PATH.MAIN} render={() => <Main/>}/>
                <Route path={PATH.LOGIN} render={() => <Login/>}/>
                <Route path={PATH.REGISTER} render={() => <Register/>}/>
                <Route path={PATH.RESTORE_PASSWORD} render={() => <RestorePassword/>}/>
                <Route path={PATH.UPDATE_PASSWORD} render={() => <UpdatePassword/>}/>
                <Route path={PATH.TEST} render={() => <TestPage/>}/>
                <Route render={() => <Error404/>}/>

            </Switch>
        </div>
    );
}
