import React, { Component } from "react";
import { Text, View, Link } from "react-native";
import { Button } from "react-native-paper";
import { SocialIcon } from "react-native-elements";
import getEnvVars from "me-me/environment";
import { Google, /*Facebook,*/ AuthSession } from "expo";
import * as Facebook from 'expo-facebook'; 
import { connect } from "react-redux";

class SignUp extends Component {
  state = {
    loading: false
  };

  facebookLogIn = async () => {
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
  }

  googleLogIn = async () => {
    try{
      const { apiUrl, webClientId } = getEnvVars;
      
      this.setState({ loading: true });
      let redirectUrl = AuthSession.getRedirectUrl()
      console.log(webClientId)
      console.log(getEnvVars)
      let result = await AuthSession.startAsync({
        authUrl:
          `https://accounts.google.com/o/oauth2/v2/auth?` +
          `&client_id=${webClientId}` +
          `&redirect_uri=${encodeURIComponent(redirectUrl)}`+
          `&response_type=code` +
          `&access_type=offline` +
          `&scope=${encodeURIComponent('email profile')}`,
      })

      console.log(result)

      if(result.type === 'success') {
        
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(result)
        }

        console.log('options:', options)
        fetch(apiUrl + '/auth/google_oauth2/callback',
        options)
        .then(response => response.json())
        .then(json => {
          console.log('json response:', json)
          this.setState({ loading: false })
          return json
        })
        .catch(error => {
          console.log(error)
          this.setState({ loading: false })
          return error
        })
      }else {
        this.setState({ loading: false })
      }
    } catch ({ message }) {
      alert(`login: ${message}`);
      this.setState({ loading: false });
    }    
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', marginBottom: 10}}>
        <View style={{flex: 1}} />
        <SocialIcon
          button
          type="facebook"
          onPress={e => this.facebookLogIn(e)}
          style={{flex: 2}}
          light
          type='facebook'
        />
        <SocialIcon
          style={{flex: 2}}
          light
          disabled={this.state.loading}
          onPress={this.googleLogIn}
          type="google-plus-official"
        />
        <View style={{flex: 1}} />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoggingIn } = state.session
  return { isLoggingIn }
}

export default connect(mapStateToProps)(SignUp);
