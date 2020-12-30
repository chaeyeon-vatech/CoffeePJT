import React, {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import useWindowSize from 'resources/hooks/useWindowSize';
import PrivateSection from 'routes/PrivateSection';
import PublicRoutes from 'routes/PublicRoutes';
import {useQuery} from "@apollo/react-hooks";
import {MeQuery} from "../util/query";

function Routes() {
    const {pathname} = useLocation();
    const [width, height] = useWindowSize();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    const {data} = useQuery(MeQuery);

    return data ? <PrivateSection/> : <PublicRoutes/>;
}

export default Routes;
