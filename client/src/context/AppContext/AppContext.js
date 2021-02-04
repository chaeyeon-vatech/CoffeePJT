import React, {useReducer} from "react";

const initialState = {
    refresh: 0,
    debug: {
        log: true,
        warn: true,
        error: true,
        info: true
    },
    route: {path: "", props: null},
    status: false,
    orderer: null,
    buyer: null,
    ready: false,
    cache: 0
};

const initializer = () => {

    return {...initialState};
};

const reducer = (state, action) => {
    // console.info(action);
    switch (action.type) {
        case "init":
            return initializer();

        case "refresh":
            return {...state, refresh: state.refresh + 1};

        case "cache":
            return {...state, cache: state.cache + 1};

        case "debug":
            return {...state, debug: action.target};

        case "ready":
        case "orderer":
        case "route":
        case "status":
        case "buyer":
            return {...state, [action.type]: action.target};
        default:
            return state;
    }
};

const AppContext = React.createContext();
const AppContextConsumer = AppContext.Consumer;

const AppContextProvider = props => {
    const [appContext, dispatchApp] = useReducer(reducer, {...initializer()});

    const value = {appContext, dispatchApp};


    return (
        <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
    );
};

export default AppContextProvider;
export {AppContext, AppContextConsumer};
