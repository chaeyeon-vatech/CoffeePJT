import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import PrivateSection from 'routes/PrivateSection';
import PublicRoutes from 'routes/PublicRoutes';
import {useQuery} from "@apollo/react-hooks";
import {TASK_QUERY} from "../graphql/query";

function Routes() {
    const {pathname} = useLocation();
    const [task, setTask] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    const {data} = useQuery(TASK_QUERY);

    useEffect(() => {
        if (data) {
            setTask(data.tasks);
        }
    }, [data]);

    return task ?

        <PrivateSection/> : <PublicRoutes/>;

}

export default Routes;
