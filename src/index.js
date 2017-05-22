
import React, { Component, } from 'react';
import { AppRegistry, NetInfo, Text, View, StyleSheet } from 'react-native';
import App from './app';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

class Client extends Component {
    render() {
            const networkInterface = createNetworkInterface({
                uri: 'http://winde-165014.appspot.com/graphql'
            })
            const client = new ApolloClient({
                networkInterface
            });
            return (
                <ApolloProvider client={client}>
                <App />
                </ApolloProvider>)
    }
}

AppRegistry.registerComponent('Winde', () => Client);
