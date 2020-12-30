import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/links';
import LoadingComponent from 'components/loading';
import basicLogin from '../auth/LoginPage';
import LINKS from '../resources/links';
import RegisterPage from '../auth/RegisterPage';
import PaymentboardComponent from "./paymentboard";
import UserboardComponent from "./userboard";

const OrderboardComponent = lazy(() => import('./orderboard/OrderBoardComponent'));

function PrivateRoutes() {
    return (
        <Suspense fallback={<LoadingComponent loading />}>
            <Switch>
                <Route exact path={SLUGS.orderboard} component={OrderboardComponent} />
                <Route exact path={SLUGS.tickets} component={PaymentboardComponent} />
                <Route exact path={SLUGS.settings} component={UserboardComponent} />

                <Redirect to={SLUGS.orderboard} />
            </Switch>
        </Suspense>
    );
}

export default PrivateRoutes;
