import React, { Component, Fragment } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import AuthenticatedAppContainer from './src/routing/AuthenticatedAppContainer'
import UnathenticatedAppContainer from './src/routing/UnathenticatedAppContainer'

authenticated = true;

class App extends Component {
  render() {
    return(
      <Fragment>
        {authenticated ? (
          <AuthenticatedAppContainer style={styles.container}/>
        ) : (
          <UnauthenticatedAppContainer style={styles.container}/>
        )}
      </Fragment>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
