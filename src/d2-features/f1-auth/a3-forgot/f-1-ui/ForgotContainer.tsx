import React from 'react';
import {Redirect} from "react-router";
// import {SIGN_IN_PATH} from "../../../../neko-1-main/m-1-ui/Routes";
import Forgot from './Forgot';

const ForgotContainer: React.FC = () => {


    if(false) {
        return <Redirect to={'/login'} />
    }

    return (
        <Forgot

        />
    );
};

export default ForgotContainer;
