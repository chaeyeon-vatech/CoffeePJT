import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LINKS from 'resources/links';

function PublicRoutes() {
    return (
        <Switch>
            <Route path={LINKS.login} render={() => <div>login</div>} />
            <Route path={LINKS.signup} render={() => <div>signup</div>} />
            <Route path={LINKS.forgotPassword} render={() => <div>forgotPassword</div>} />
            <Redirect to={LINKS.login} />
        </Switch>
    );
}

export default PublicRoutes;
