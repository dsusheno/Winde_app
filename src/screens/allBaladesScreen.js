import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  StatusBar,
  Image,
  View,
  PixelRatio,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';

import { NavigationActions } from 'react-navigation';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ListView, Screen, Tile, Title, Subtitle, Divider } from '@shoutem/ui';
import Stars from 'react-native-stars';

class ListBalades extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);

        const imageHeight = PixelRatio.getPixelSizeForLayoutSize(60);
        this.state = {imageHeight: imageHeight};
    }

    renderRow(balade) {
        return (
            <View>
             <TouchableHighlight onPress={() => this.props.navigation.navigate('BaladeTabs', {...balade})}>
              <Image
              source={ {uri: balade.image} }
              style={{height: this.state.imageHeight}}
              >
              <Title>{balade.title}</Title>
              <View style={{alignItems:'flex-start'}}>
              <Stars
              value={balade.rating}
              spacing={5}
              count={5}
              starSize={24}
              backingColor='transparent'
              fullStar={require('../img/icons/star_white.png')}
              emptyStar={require('../img/icons/star_border_white.png')}
              halfStar={require('../img/icons/star_half_white.png')}
              />
              </View>
              </Image>
              </TouchableHighlight>
              <View style={{height: 7}}></View>
              </View>
          );
      };

    render() {
        const { data } = this.props

        if (data.loading)
        {

            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator
                    animating={true}
                    size="large"
                  />
                </View>)
        }

        return (
            <View>
            <StatusBar
                backgroundColor="#D2D2D2"
                barStyle="light-content"
            />
            <ListView
                data={data.allBalades}
                renderRow={this.renderRow}
            />
            </View>
        )
    }
}

class AllBaladesScreen extends Component {
    render() {
        const query = gql`query Query {
            allBalades {
                id
                title
                image
                location
                rating
                duration
                description
                tags
            }
        }`;

        const ListAllBalades = graphql(query)(ListBalades);

        return(<ListAllBalades navigation={this.props.navigation}/>)
    }
}

const styles = StyleSheet.create({
    title: {
        alignItems: 'flex-start',
        textAlign: 'left',
        color: '#FFFFFF'
    },
});

export default AllBaladesScreen;
