import React, { Component } from 'react'
import { Text, View, Link } from 'react-native'
import {Button} from 'react-native-paper'
import { SocialIcon } from 'react-native-elements'
import getEnvVars from 'me-me/environment'
import { Google } from 'expo'

class SignUp extends Component {

  state = {
    loading : false
  }

  googleLogIn = async () => {
    try{

      const { androidClientId, apiUrl } = getEnvVars;
      //console.log(androidClientId);
      this.setState({ loading: true });
      const { type, user, accessToken } = await Google.logInAsync({
        androidClientId: androidClientId
      });
      if (type === 'success') {
        console.log(user, accessToken);
        fetch(apiUrl + '/auth/google_oauth2/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: user,
            accessToken: accessToken
          })
        })
      }else{
        this.setState({ loading: false }); 
      }
    } catch ({ message }) {
      alert(`login: ${message}`);
      this.setState({ loading: false });
    }
      
  }

  render(){
    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', marginBottom: 10}}>
        <View style={{flex: 1}} />
        <SocialIcon
          style={{flex: 2}}
          light
          type='facebook'
        />
        <SocialIcon
          style={{flex: 2}}
          light
          disabled={this.state.loading}
          loading={this.state.loading}
          onPress={this.googleLogIn}
          type='google-plus-official'
        />
        <View style={{flex: 1}} />
      </View>
    );
  }
}

export default SignUp;