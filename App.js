import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

// import MainNavigator from './src/routing/MainNavigator';

import {createStackNavigator,createAppContainer} from 'react-navigation';

import Login from './src/screens/login/containers/Login'
import SignUp from './src/screens/sign_up/containers/SignUp';
import Recovery from './src/screens/recovery/containers/Recovery';
import Feed from './src/screens/feed/containers/Feed';
import Settings from './src/screens/settings/containers/Settings';
import Post from './src/screens/post/containers/Post';
import Editor from './src/screens/editor/containers/Editor';
import Swiper from './src/screens/swiper/containers/Swiper';
import Finder from './src/screens/finder/containers/Finder';
import Notification from './src/screens/notification/containers/Notification';
import ValidateEmail from './src/screens/sign_up/containers/ValidateEmail'
import UploadMeme from './src/screens/upload_meme/containers/UploadMeme';

const MainNavigator = createStackNavigator({
  LoginScreen: { screen: Login, navigationOptions: {header:null}},
  SignUpScreen: { screen: SignUp, navigationOptions: {header:null}},
  RecoveryScreen: {screen: Recovery},
  FeedScreen: {screen: Feed},
  SettingScreen: {screen: Settings},
  PostScreen: {screen: Post},
  EditorScreen: {screen: Editor},
  SwiperScreen: {screen: Swiper},
  FinderScreen: {screen: Finder},
  NotificationsScreen: {screen: Notification},
  ValidateEmailScreen: {screen: ValidateEmail, navigationOptions: {header:null}},
});

const App = createAppContainer(MainNavigator);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
