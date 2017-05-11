import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ListView, Image, Screen, Tile, Title, Subtitle, Divider } from '@shoutem/ui';

class ListBalades extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
    }

    renderRow(balade) {
        return (
              <View>
              <Image
              styleName="large-banner"
              source={ {uri: balade.image} }
              >
              <Tile>
              <Title styleName="md-gutter-bottom">{balade.title}</Title>
              <Subtitle styleName="sm-gutter-horizontal">{balade.id}</Subtitle>
              </Tile>
              </Image>
              <Divider styleName="line" />
              </View>
          );
      };

    render() {
        const { data} = this.props

        if (!data.allBalades)
        {

            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
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
            <Screen>
            <StatusBar
                backgroundColor="#D2D2D2"
                barStyle="light-content"
            />
            <ListView
                data={data.allBalades}
                renderRow={this.renderRow}
            />
            </Screen>
        )
    }
}

class HomeScreen extends Component {
    render() {
        const query = gql`query Query {
            allBalades {
                id
                title
                image
                location
                rating
                duration
                tags
            }
        }`;

        const ListAllBalades = graphql(query)(ListBalades);

        return(<ListAllBalades />)
    }
}

export default HomeScreen;
