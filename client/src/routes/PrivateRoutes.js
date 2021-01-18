import React, {Suspense, lazy} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LINKS from 'resources/links';
import LoadingComponent from 'components/loading';
import { useHistory } from "react-router-dom";
// import PaymentboardComponent from "./paymentboard";
// import UserboardComponent from "./userboard";
// import basicLogin from "./firstpage/LoginPage";
// import MenuBoard from "./orderboard/Menu";
import NoTask from "./firstpage/Stepper";
import AfterOrder from "./orderboard/AfterOrder";

// const OrderboardComponent = lazy(() => import('./orderboard/OrderBoardComponent'));

const MenuBoard = lazy(()=> import('./orderboard/Menu'))
const Create = lazy(()=>import('./firstpage/Create'))
const basicLogin = lazy(()=>import('./firstpage/LoginPage'))
const UserboardComponent = lazy(()=>import('./userboard/UserboardComponent'))
const PaymentboardComponent = lazy(()=>import('./paymentboard'))


function PrivateRoutes (){



    return localStorage.getItem('myData') ? (
        <Suspense fallback={<LoadingComponent loading/>}>

            <Switch>

                <Route exact path={LINKS.orderboard} component={MenuBoard}/>
                <Route exact path={LINKS.after} component={AfterOrder}/>
                <Route exact path={LINKS.tickets} component={PaymentboardComponent}/>
                <Route exact path={LINKS.settings} component={UserboardComponent}/>
                <Route exact path={LINKS.reset} component={Create}/>
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
