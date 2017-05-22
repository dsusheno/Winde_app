import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  PixelRatio,
  Button
} from 'react-native';

class BaladeMapScreen extends Component {
    render (){
        return (
            <View>
            <Text style={{color: 'black'}}>{this.props.navigation.state.params.title}</Text>
            </View>
        )
    }
}

export default BaladeMapScreen;
