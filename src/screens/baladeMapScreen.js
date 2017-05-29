import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  PixelRatio,
  Button
} from 'react-native';
import Map from '../components/Map'

class BaladeMapScreen extends Component
{
    static navigationOptions = {
        
    }
    render ()
    {
        return (
          <Map markers={this.props.navigation.state.params.markers}/>
        );
    }
}

export default BaladeMapScreen;
