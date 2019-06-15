import React, { Component } from "react";
import { Text, View, Link } from "react-native";
import { Button } from "react-native-paper";
import { SocialIcon } from "react-native-elements";
import getEnvVars from "me-me/environment";
import { Google, Facebook } from "expo";

class SignUp extends Component {
  state = {
    loading: false
  };

  faceboolLogIn = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync("470171777128170", {
        permissions: ["public_profile"]
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        console.log(token);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  googleLogIn = async () => {
    try {
      const { androidClientId } = getEnvVars;
      console.log(androidClientId);
      this.setState({ loading: true });
      const { type, user, accessToken } = await Google.logInAsync({
        androidClientId: androidClientId
      });
      this.setState({ loading: false });
      if (type === "success") {
        console.log(user, accessToken);
      }
    } catch ({ message }) {
      alert(`login: ${message}`);
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <View style={{ flex: 2, justifyContent: "center" }}>
        <View style={{ alignSelf: "center", marginTop: 8, marginBottom: 8 }}>
          <Text>Or</Text>
        </View>
        <SocialIcon
          title="Sign In With Facebook"
          button
          type="facebook"
          onPress={this.faceboolLogIn}
        />
        <SocialIcon
          title="Sign In With Google"
          button
          disabled={this.state.loading}
          loading={this.state.loading}
          onPress={this.googleLogIn}
          type="google-plus-official"
        />
        <Button
          title="Sign Up"
          onPress={() => this.props.navigation.navigate("SignUp")}
        >
          Sign Up
        </Button>
      </View>
    );
  }
}

export default SignUp;
