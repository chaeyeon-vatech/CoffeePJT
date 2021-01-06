import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LINKS from 'resources/links';
import SLUGS from '../resources/links';
import basicLogin from './firstpage/LoginPage';
import NoTask from "./firstpage/NoTask";
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../graphql/query";
import Create from "./firstpage/Create";

function PublicRoutes() {
    const {task} = useQuery(TaskQuery);


    return (
        <Switch>

            task ?
            <Route exact path={SLUGS.login} component={NoTask}/>:
            <Route exact path={SLUGS.login} component={basicLogin}/>
            <Route exact path={LINKS.create} component={Create}/>

        </Switch>
    );
}

export default PublicRoutes;
