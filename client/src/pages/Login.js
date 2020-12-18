import React, {Component, useEffect, useState} from 'react';
import Header from "../layout/Header";
import Menu from "../layout/Menu";
import Footer from "../layout/Footer";
import {useQuery} from "@apollo/react-hooks";
import LoginForm from "../component/LoginForm";
// import {FETCH_POSTS_QUERY} from "../util/graphql";
// import CRUDTable from "../components/CRUDTable";

function Login() {

    return (
        <div>
            <Header/>
            <Menu/>
            <LoginForm/>
            <Footer/>
        </div>
    )

}

export default Login;
