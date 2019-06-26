import React, { Component, Fragment } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import Constants from "expo-constants";
import { connect } from "react-redux";

import AuthenticatedAppContainer from "./routing/AuthenticatedAppContainer";
import UnauthenticatedAppContainer from "./routing/UnauthenticatedAppContainer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBar: {
    backgroundColor: "#FFF",
    height: Constants.statusBarHeight
  }
});


class MemeApp extends Component {

  render() {
    // console.log("Appjs", this.props);
    const { authenticated } = this.props
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.statusBar} />
        <Fragment>
          {authenticated ? (
            <AuthenticatedAppContainer
              style={styles.container}
            />
          ) : (
            <UnauthenticatedAppContainer
              style={styles.container}
            />
          )}
        </Fragment>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const { jwt } = state.session
  const authenticated = jwt || false
  console.log(`AUTH: ${authenticated}`)
  return { authenticated }
};

export default connect(mapStateToProps)(MemeApp);