import React, {Component, useEffect, useState} from 'react';
import Header from "../layout/Header";
import Menu from "../layout/Menu";
import Footer from "../layout/Footer";
import RegisterForm from "../component/RegisterForm";


function Register() {

    return (
        <div>
            <Header/>
            <Menu/>
            <RegisterForm/>
            <Footer/>
        </div>
    )

}

export default Register;
