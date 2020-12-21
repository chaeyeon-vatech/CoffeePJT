import React from 'react';
import App from './App';
import {ApolloClient, ApolloLink} from 'apollo-boost'
import {onError} from 'apollo-link-error'
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import { ThemeProvider } from 'react-jss';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Theme from 'resources/theme';
import Routes from 'routes';
import {CookiesProvider} from 'react-cookie';
import { setContext } from '@apollo/client/link/context';

import {useAuthToken} from './auth/authToken';

import './index.css';
import * as serviceWorker from './serviceWorker';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
});



const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    console.log(localStorage.getItem("token"));
    const token=localStorage.getItem("token");

    console.log(token);
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});



const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors) {
        console.log('graphQLErrors', graphQLErrors);
    }
    if (networkError) {
        console.log('networkError', networkError);
    }
});


const client = new ApolloClient({
    link: ApolloLink.from([errorLink, authLink.concat(httpLink)]),
    cache: new InMemoryCache()
});



export default (
    <ThemeProvider theme={Theme}>
    <ApolloProvider client={client}>
        <CookiesProvider>
        <App/>
        </CookiesProvider>
    </ApolloProvider>
    </ThemeProvider>
);