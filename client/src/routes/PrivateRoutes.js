import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/links';
import LoadingComponent from 'components/loading';

const DashboardComponent = lazy(() => import('./orderboard'));

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.dashboard} component={DashboardComponent} />
                <Route exact path={SLUGS.tickets} render={() => <div>tickets</div>} />
                <Route exact path={SLUGS.settings} render={() => <div>settings</div>} />
                <Redirect to={SLUGS.dashboard} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
