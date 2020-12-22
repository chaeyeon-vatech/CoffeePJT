import React from 'react';
import App from './App';
import { ApolloClient, ApolloLink } from 'apollo-boost';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from 'react-jss';
import Theme from 'resources/theme';
import { CookiesProvider } from 'react-cookie';
import { setContext } from '@apollo/client/link/context';

import './index.css';
import * as serviceWorker from './serviceWorker';
import { useAuthToken } from './auth/authToken';
import { concat } from '@apollo/client';
import * as http from 'http';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token ? `${token}` : "",
        }
    }
});


const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default (
    <ThemeProvider theme={Theme}>
        <ApolloProvider client={client}>
            <CookiesProvider>
                <App />
            </CookiesProvider>
        </ApolloProvider>
    </ThemeProvider>
);