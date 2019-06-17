import React from 'react'
import { createAppContainer, createDrawerNavigator } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import FeedScreen from '../screens/feed/FeedScreen'
import UploadMemeScreen from '../screens/upload_meme/UploadMemeScreen'
import SettingsScreen from '../screens/settings/SettingsScreen'

import Icon from 'react-native-vector-icons/Ionicons'

const MyBottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Feed: { screen: FeedScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => ( <Icon name="md-search" color={tintColor} size={24} /> )
      }
    },
    Upload: { screen: UploadMemeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => ( <Icon name="md-add" color={tintColor} size={24} /> )
      }
    },
    Settings: { screen: SettingsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => ( <Icon name="md-settings" color={tintColor} size={24} /> ) 
      }
    },
  },
  {
    initialRouteName: 'Settings',
    activeColor: '#F6BD60',
    barStyle:{
      backgroundColor: '#272727',

    }
  }
);

const AuthenticatedAppContainer = createAppContainer(MyBottomTabNavigator)

export default AuthenticatedAppContainer