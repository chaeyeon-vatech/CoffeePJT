import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes';

let count = 0;

const App = () => {

    count++;

    console.log("rendering count", count)


    return (
        <Router>
            <Routes/>
        </Router>
    );

}

export default App;
