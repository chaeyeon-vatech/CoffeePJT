import {ContextProvider} from "./context";
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import App from "./App";


ReactDOM.render(
    <ContextProvider>
        <App/>
    </ContextProvider>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
// npx babel-node src/check.js cross-env NODE_PATH=src react-scripts start