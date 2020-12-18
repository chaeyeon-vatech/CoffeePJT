import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';

import Main from "./pages/Main";
import Search from "./pages/Payment";
import Login from "./pages/Login";
import Register from "./pages/Register";


class App extends Component {
  render() {
    return (
        <Router>
          <div>
            <Route exact path="/" component={Main}/>
            <Route exact path="/pay" component={Search}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
          </div>
        </Router>
    );
  }
}

export default App;