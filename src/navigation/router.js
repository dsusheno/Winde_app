import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar
} from 'react-native';

import AllBaladesScreen from '../screens/allBaladesScreen';
import NearScreen from '../screens/near';
import ProfileScreen from '../screens/profile';
import BaladeInfoScreen from '../screens/baladeInfoScreen';
import CommentsScreen from '../screens/commentsScreen';

export const HomeTabs = TabNavigator({
    AllBalades: {
        screen: AllBaladesScreen,
        navigationOptions: {
            tabBarLabel: 'Nouveau',
            headerTitle: 'Accueil',
            headerLeft: <Text>Popo</Text>,
            headerRight: <Text>lollolololo</Text>,
      }
  },
    Near: {
        screen: NearScreen,
        navigationOptions: {
            tabBarLabel: 'À proximité',
            headerTitle: 'Accueil',
            headerLeft: <Text>Popo</Text>,
            headerRight: <Text>lollolololo</Text>,
        }
    }
},
{
    swipeEnabled: true,
    tabBarPosition: 'top',
    tabBarOptions: {
        style: {
            backgroundColor: '#E6E6E6',
        },
        indicatorStyle: {
            backgroundColor: '#8E3797'
        },
        activeTintColor: '#8E3797',
        inactiveTintColor: '#8E3797'
    }
});

export const BaladeTabs = TabNavigator({
    BaladeInfo: {
        screen: BaladeInfoScreen,
        navigationOptions: {
            tabBarLabel: 'Info',
            headerTitle: 'Description',
            headerRight: <Text></Text>
      }
  },
    Comments: {
        screen: CommentsScreen,
        navigationOptions: {
            tabBarLabel: 'Commentaires',
            headerTitle: 'Description',
            headerRight: <Text></Text>,
        }
    }
},
{
    swipeEnabled: true,
    tabBarPosition: 'top',
    tabBarOptions: {
        style: {
            backgroundColor: '#E6E6E6',
        },
        indicatorStyle: {
            backgroundColor: '#8E3797'
        },
        activeTintColor: '#8E3797',
        inactiveTintColor: '#8E3797'
    }
});

export const Root = StackNavigator({
    HomeTabs: {
        screen: HomeTabs,
    },
    BaladeTabs: {
        screen: BaladeTabs,
    }
},
{
  mode: 'card',
  headerMode: 'screen',
  navigationOptions: {
      headerStyle: {
          backgroundColor: '#E6E6E6',
          elevation: 0,
      },
      headerTintColor: '#8E3797',
  }
});
