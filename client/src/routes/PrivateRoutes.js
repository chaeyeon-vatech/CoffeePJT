import React, {Suspense, lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LINKS from 'resources/links';
import LoadingComponent from 'components/loading';
import PaymentboardComponent from "./paymentboard";
import UserboardComponent from "./userboard";
import basicLogin from "./firstpage/LoginPage";
import Create from "./firstpage/Create";
import MenuBoard from "./orderboard/Menu";
import NoTask from "./firstpage/Stepper";

const OrderboardComponent = lazy(() => import('./orderboard/OrderBoardComponent'));

function PrivateRoutes() {
    return localStorage.getItem("myData") ? (
        <Suspense fallback={<LoadingComponent loading/>}>

            <Switch>

                <Route exact path={LINKS.orderboard} component={MenuBoard}/>
                <Route exact path={LINKS.tickets} component={PaymentboardComponent}/>
                <Route exact path={LINKS.settings} component={UserboardComponent}/>
                <Route exact path={LINKS.create} component={Create}/>
                <Redirect to={LINKS.orderboard} component={MenuBoard}/>


            </Switch>
        </Suspense>
    ) : (
        <Suspense fallback={<LoadingComponent loading/>}>

            <Switch>

                <Route exact path={LINKS.ologin} component={basicLogin}/>
                <Redirect to={LINKS.ologin} component={basicLogin}/>

            </Switch>
        </Suspense>
    )
}

export default PrivateRoutes;
