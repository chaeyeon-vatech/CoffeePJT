import React from 'react';
import App from './App';
import {ApolloClient, ApolloLink} from 'apollo-boost';
import {onError} from 'apollo-link-error';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {createHttpLink} from 'apollo-link-http';
import {ApolloProvider} from '@apollo/react-hooks';
import {ThemeProvider} from 'react-jss';
import Theme from 'resources/theme';
import {CookiesProvider} from 'react-cookie';
import {setContext} from '@apollo/client/link/context';

import './index.css';

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql'
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token');

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
                <App/>
            </CookiesProvider>
        </ApolloProvider>
    </ThemeProvider>
);