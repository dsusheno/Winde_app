import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  PixelRatio,
  Button
} from 'react-native';

class BaladeInfoScreen extends Component {
    constructor() {
        super();

        const imageHeight = PixelRatio.getPixelSizeForLayoutSize(60);
        this.state = {imageHeight: imageHeight};
    }
    render (){
        const {title, image, description} = this.props.navigation.state.params;
        return (
            <View>
            <Image
            source={ {uri: image} }
            style={{height: this.state.imageHeight}}
            />
            <Text style={{color: 'black'}}>{description}</Text>
            <Button
            onPress={() => this.props.navigation.navigate('BaladeMap', {...this.props.navigation.state.params})}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />
            </View>
        )
    }
}

export default BaladeInfoScreen;
