import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from 'react-jss';
import Theme from './resources/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

class App extends Component {
    render() {
        return (
            <Router>
                <Routes />
            </Router>
        );
    }
}

export default App;
