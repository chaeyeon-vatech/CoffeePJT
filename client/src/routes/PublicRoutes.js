import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LINKS from 'resources/links';
import NoTask from "./firstpage/Stepper";
import First from "./firstpage/First";
import CustomizedSteppers from "./firstpage/Stepper";

function PublicRoutes() {

    return localStorage.getItem('name') ? (
        <Switch>
            <Route path={LINKS.create} component={CustomizedSteppers} render={() => (
                <Redirect to={LINKS.create} component={CustomizedSteppers}/>
            )}/>

        </Switch>
    ) : (
        <Switch>
            <Route path={LINKS.ologin} component={First} render={() => (
                <Redirect to={LINKS.ologin} component={LINKS.ologin}/>
            )}/>

        </Switch>

    )
}

export default PublicRoutes;
