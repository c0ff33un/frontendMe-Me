import { createAppContainer, createDrawerNavigator } from 'react-navigation'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import FeedScreen from '../screens/feed/FeedScreen'
import UploadMemeScreen from '../screens/upload_meme/UploadMemeScreen'
/*
import Recovery from '../screens/recovery/containers/Recovery';
import Feed from '../screens/feed/containers/Feed';
import Settings from '../screens/settings/containers/Settings';
import Post from '../screens/post/containers/Post';
import Editor from '../screens/editor/containers/Editor';
import Swiper from '../screens/swiper/containers/Swiper';
import Finder from '../screens/finder/containers/Finder';
import Notification from '../screens/notification/containers/Notification';

const MyDrawerNavigator = createDrawerNavigator(
  {
    Feed: {
      screen: FeedScreen 
    },
    Upload: {
      screen: UploadMemeScreen
    }
  },
  {
    initialRouteName: 'Feed'
  }
);
*/

const MyBottomTabNavigator = createMaterialBottomTabNavigator(
  {
    Feed: { screen: FeedScreen },
    Upload: { screen: UploadMemeScreen},
  },
  {
    initialRouteName: 'Feed',
    activeColor: '#FF6B35'
  }
);

const AuthenticatedAppContainer = createAppContainer(MyBottomTabNavigator)

export default AuthenticatedAppContainer