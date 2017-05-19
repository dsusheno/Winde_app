
import React, { Component, } from 'react';
import { AppRegistry, NetInfo, Text, View, StyleSheet } from 'react-native';
import App from './app';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

class Client extends Component {
    constructor() {
        super();

        this.state = {connectionInfo: ''};
    }

    connectivityChange = (connectionInfo) => {
        this.setState({
            connectionInfo,
        });
    }
    render() {
        NetInfo.addEventListener('change', this.connectivityChange);

        if (this.state.connectionInfo == "MOBILE" || this.state.connectionInfo == "WIFI")
        {
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
        else
            return(<View style={styles.noConnection}><Text>Please, check your Internet Connection</Text></View>);
    }
}

const styles = StyleSheet.create({
    noConnection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

AppRegistry.registerComponent('Winde', () => Client);
