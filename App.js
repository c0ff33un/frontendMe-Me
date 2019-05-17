import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Login from './src/screens/login/containers/Login'
import SignUp from './src/screens/sign_up/containers/SignUp';

import { StackNavigator } from 'react-navigation';

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider>
        <SignUp />
      </PaperProvider>
    );
  }
}

const AppNavigator = StackNavigator({
  LoginScreen: { screen: Login},
  SignUpScreen: { screen: SignUp},
  RecoveryScreen: {screen: RecoverPass},
  FeedScreen: {screen: Feed},
  SettingScreen: {screen: Settings},
  PostScreen: {screen: Post},
  EditorScreen: {screen: Editor},
  SwiperScreen: {screen: Swiper},
  FinderScreen: {screen: Finder},
  NotificationsScreen: {screen: Notifications},


})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
