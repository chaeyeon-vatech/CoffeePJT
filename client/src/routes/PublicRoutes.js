import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LINKS from 'resources/links';
import SLUGS from '../resources/links';
import NoTask from "./firstpage/NoTask";
import Create from "./firstpage/Create";

function PublicRoutes() {


    return (
        <Switch>
            <Route exact path={LINKS.login} component={NoTask}/>
            <Route exact path={LINKS.create} component={Create}/>

        </Switch>
    );
}

export default PublicRoutes;
