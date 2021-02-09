import {makeStyles} from "@material-ui/styles";
import {ApolloProvider} from '@apollo/react-hooks';
import {SnackbarProvider} from "notistack";
import React from "react";
import {ThemeProvider} from 'react-jss';
import Theme from 'resources/theme';
import {ApolloClient} from "apollo-boost";
import {InMemoryCache} from "apollo-cache-inmemory";
import {createHttpLink} from "apollo-link-http";
import AppContextProvider from "../AppContext";
import {PaymentContextProvider} from "../index";
import UserContextProvider from "../UserContext";

const useStyles = makeStyles(() => ({
    root: {width: "40vw"},
    containerAnchorOriginBottomCenter: {}
}));

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
});

const client = new ApolloClient({
    link: httpLink,
    fetchPolicy: "no-cache",
    cache: new InMemoryCache()
});

const ThemeContext = props => {
    const {children} = props;
    const classes = useStyles();

    return (
        <ThemeProvider theme={Theme}>
            <SnackbarProvider
                classes={{
                    root: classes.root,
                    containerAnchorOriginBottomCenter:
                    classes.containerAnchorOriginBottomCenter
                }}
                maxSnack={3}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                disableWindowBlurListener={true}
            >
                {children}
            </SnackbarProvider>
        </ThemeProvider>
    );
};

const ContextProvider = props => {
    const {children} = props;

    return (
        <AppContextProvider>

            <ApolloProvider client={client}>
                <UserContextProvider>
                    <PaymentContextProvider>
                        <ThemeContext children={children}/>
                    </PaymentContextProvider>
                </UserContextProvider>
            </ApolloProvider>

        </AppContextProvider>

    );
};

export default ContextProvider;
