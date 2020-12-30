import React, {Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LINKS from 'resources/links';
import SLUGS from '../resources/links';
import basicLogin from '../auth/LoginPage';
import RegisterPage from '../auth/RegisterPage';
import PaymentboardComponent from "./paymentboard";
import UserboardComponent from "./userboard";
import LoadingComponent from "../components/loading";

function PublicRoutes() {
    return (
        <Switch>
            <Route exact path={SLUGS.login} component={basicLogin}/>
            <Route path={LINKS.signup} component={RegisterPage}/>
            <Redirect to={SLUGS.login}/>
        </Switch>
    );
}

export default PublicRoutes;
