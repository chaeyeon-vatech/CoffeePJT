import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LINKS from 'resources/links';
import SLUGS from '../resources/links';
import basicLogin from './firstpage/LoginPage';
import NoTask from "./firstpage/NoTask";
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../graphql/query";
import PaymentboardComponent from "./paymentboard";
import LoginPage from "./firstpage/LoginPage";
import Create from "./firstpage/Create";

function PublicRoutes() {
    const {task} = useQuery(TaskQuery);


    return (
        <Switch>

            <Route exact path={LINKS.create} component={Create}/>
            <Route exact path={LINKS.login} component={NoTask}/>

        </Switch>
    );
}

export default PublicRoutes;
