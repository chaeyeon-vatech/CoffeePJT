import React, {Component, useEffect, useState} from 'react';

import Header from "../layout/Header";
import Menu from "../layout/Menu";
import Footer from "../layout/Footer";
import OrderTable from "../component/OrderTable";
// import {useQuery} from "@apollo/react-hooks";
// import {FETCH_POSTS_QUERY} from "../util/graphql";


function Main() {


    return (
        <div>
            <Header/>
            <Menu/>
            <OrderTable/>

        </div>
    )

}

export default Main;