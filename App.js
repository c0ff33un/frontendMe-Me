import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Login from './src/screens/login/containers/Login'
import SignUp from './src/screens/sign_up/containers/SignUp';

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider>
        <SignUp />
      </PaperProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
