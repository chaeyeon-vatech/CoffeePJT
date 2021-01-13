import React, {useEffect, useState} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import LINKS from 'resources/links';
import NoTask from "./firstpage/Stepper";
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../graphql/query";
import OrderCreate from "./firstpage/OrderCreate";
import Stepper from "@material-ui/core/Stepper";
import basicLogin from "./firstpage/LoginPage";

function PublicRoutes() {

    const [task, setTask] = useState();
    const {data} = useQuery(TaskQuery);

    useEffect(() => {
        if (data) {
            setTask(data.tasks);
        }
    }, [data]);


    return (
        <Switch>


            <Route exact path={LINKS.login} component={NoTask}/>
            <Redirect to={LINKS.login} component={NoTask}/>

        </Switch>
    );
}

export default PublicRoutes;
