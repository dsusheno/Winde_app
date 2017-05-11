import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import HomeScreen from '../screens/home';
import NearScreen from '../screens/near';
import ProfileScreen from '../screens/profile';

export const Tabs = TabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Nouveau',
      }
  },
    Near: {
        screen: NearScreen,
        navigationOptions: {
            tabBarLabel: 'À proximité'
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
    Tabs: {
        screen: Tabs,
    }
},
{
  mode: 'card',
  headerMode: 'screen',
  navigationOptions: {
      headerTitle: 'Accueil',
      headerStyle: {
          backgroundColor: '#E6E6E6',
          elevation: 0
      },
      headerTitleStyle: {
          
      },
      headerTintColor: '#8E3797',
  }
});
