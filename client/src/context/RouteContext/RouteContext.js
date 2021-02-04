import React, {useReducer} from "react";

const initialState = {path: "", props: null};

const reducer = (state, action) => {
    return action;
};

const RouteContext = React.createContext();
const RouteContextConsumer = RouteContext.Consumer;

const RouteContextProvider = props => {
    const [routeContext, dispatchRoute] = useReducer(reducer, initialState);
    const value = {routeContext, dispatchRoute};

    return (
        <RouteContext.Provider value={value}>
            {props.children}
        </RouteContext.Provider>
    );
};

export default RouteContextProvider;
export {RouteContext, RouteContextConsumer};
