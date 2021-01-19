import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import useWindowSize from 'resources/hooks/useWindowSize';
import PrivateSection from 'routes/PrivateSection';
import PublicRoutes from 'routes/PublicRoutes';
import {useQuery} from "@apollo/react-hooks";
import {TaskQuery} from "../graphql/query";




function Routes() {
    const {pathname} = useLocation();
    const [width, height] = useWindowSize();
    // const body = document.querySelector('body');
    // body.addEventListener('click', this.handleBodyClick);


    // function propagation(e) {
    //     // e.preventDefault(pathname);
    //     e.stopPropagation();
    //     e.nativeEvent.stopImmediatePropagation();
    // }

    const [task, setTask] = useState();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    const {data} = useQuery(TaskQuery);

    useEffect(() => {
        if (data) {
            setTask(data.tasks);
        }
    }, [data]);

    return task ?

        <PrivateSection/> : <PublicRoutes/>;

}

export default Routes;
