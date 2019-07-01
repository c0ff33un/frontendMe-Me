import React from 'react'
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import FeedScreen from '../screens/feed/FeedScreen'
import UploadMemeScreen from '../screens/upload_meme/UploadMemeScreen'
import SettingsScreen from '../screens/settings/SettingsScreen'
import PostScreen from '../screens/post/PostScreen';

import Icon from 'react-native-vector-icons/Ionicons'

const FeedStack = createStackNavigator({
  Feed: FeedScreen,
  Post: PostScreen,
  navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => ( <Icon name="md-add" color={tintColor} size={24} />)
    })
},
{
  headerMode : 'none'
});

const MyBottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Feed: {
      screen: FeedStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => ( <Icon name="md-home" color={tintColor} size={24} /> )
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
    initialRouteName: 'Feed',
    activeColor: '#F6BD60',
    barStyle:{
      backgroundColor: '#272727',
    },
    order: ['Feed','Upload','Settings']
  }
);

const AuthenticatedAppContainer = createAppContainer(MyBottomTabNavigator)

export default AuthenticatedAppContainer