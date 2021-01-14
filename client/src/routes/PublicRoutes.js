import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LINKS from 'resources/links';
import NoTask from "./firstpage/Stepper";

function PublicRoutes() {

    return (
        <Switch>
            <Route exact path={LINKS.login} component={NoTask}/>
            {/*<Redirect to={LINKS.ologin} component={NoTask}/>*/}
        </Switch>
    );
}

export default PublicRoutes;
