import React, { Component, Fragment } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import AuthenticatedAppContainer from './src/routing/AuthenticatedAppContainer';
import UnauthenticatedAppContainer from './src/routing/UnauthenticatedAppContainer';
import { Constants } from 'expo';
// redux
import { createStore } from 'redux'
import memeAppReducer from './src/reducers'

const store = createStore(memeAppReducer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusBar: {
    backgroundColor: '#FFF',
    height: Constants.statusBarHeight,
  },
});

class App extends Component {
  state={
    authenticated: true
  };

  render() {
    
    return (
      <View style={{flex: 1}}>
        <View style={styles.statusBar} />
        <Fragment>
          {this.state.authenticated ?
            (
              <AuthenticatedAppContainer style={styles.container} /> 
            ) : (
              <UnauthenticatedAppContainer style={styles.container} />
            )
          }
        </Fragment>
      </View>
    );
  }
}

export default App;


