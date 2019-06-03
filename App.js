import React, { Component, Fragment } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import AuthenticatedAppContainer from "./src/routing/AuthenticatedAppContainer";
import UnauthenticatedAppContainer from "./src/routing/UnauthenticatedAppContainer";
import { Constants } from "expo";
// redux
import { Provider } from "react-redux";
import store from "./src/redux/store";

//const store = createStore(memeAppReducer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  statusBar: {
    backgroundColor: "#FFF",
    height: Constants.statusBarHeight
  }
});

class App extends Component {
  state={
    authenticated: true
  };

  render() {
    // console.log("Appjs", this.props);
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <View style={styles.statusBar} />
          <Fragment>
            {this.state.authenticated ? (
              <AuthenticatedAppContainer
                store={store}
                style={styles.container}
              />
            ) : (
              <UnauthenticatedAppContainer
                store={store}
                style={styles.container}
              />
            )}
          </Fragment>
        </View>
      </Provider>
    );
  }
}

export default App;
