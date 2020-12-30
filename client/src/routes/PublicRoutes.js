import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LINKS from 'resources/links';
import SLUGS from '../resources/links';
import basicLogin from '../auth/LoginPage';
import RegisterPage from '../auth/RegisterPage';
import PaymentboardComponent from "./paymentboard";
import UserboardComponent from "./userboard";

function PublicRoutes() {
    return (
        <Switch>
            <Route exact path={SLUGS.tickets} component={PaymentboardComponent} />
            <Route exact path={SLUGS.settings} component={UserboardComponent} />
        </Switch>
    );
}

export default PublicRoutes;
