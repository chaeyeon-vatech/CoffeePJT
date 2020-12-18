import React, {Component, useEffect, useState} from 'react';

import Header from "../layout/Header";
import Menu from "../layout/Menu";
import Footer from "../layout/Footer";
// import {useQuery} from "@apollo/react-hooks";
// import {FETCH_POSTS_QUERY} from "../util/graphql";


function Main() {


    return (
        <div>
            <Header/>
            <Menu/>
            <h1 className="table-title">주문자 페이지</h1>
            <Footer/>
        </div>
    )

}

export default Main;