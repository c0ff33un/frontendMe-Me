import React, { Component } from "react";
import { Text, View, Linking } from "react-native";
import { Button } from "react-native-paper";
import { SocialIcon } from "react-native-elements";
import getEnvVars from "me-me/environment";
import { Google, /*Facebook,*/ /*AuthSession*/ } from "expo";
import * as Facebook from 'expo-facebook'; 
import { connect } from "react-redux";
import { loginWithJWT } from '@redux/actions';

class SignUp extends Component {
  state = {
    loading: false
  };

  facebookLogIn = async () => {
    // e.preventDefault()

    const {facebookURL} = getEnvVars
    this.setState({ loading: true });
    // Linking.openURL(facebookURL)

    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync("470171777128170", {
        permissions: ["public_profile", "email", "user_birthday"]
      });
      if (type === "success") {
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({oauth_token:token})
        }
        // Get the user's name using Facebook's Graph API
        const res = await fetch(facebookURL,options)
        // console.log(res.headers.get('authorization'))
        const jwt = res.headers.map.authorization;
        this.props.dispatch(loginWithJWT(jwt));

          // .then(res => {
          //   // console.log(res.headers.get('Authorization'))
          //   // this.props.dispatch(receiveJWT(res.headers.get('authorization  ')))
          //   const jwt = res.headers.get("authorization")
          //   // console.log()
          //   // console.log(typeof(jwt))
          //   await 
          //   // dispatch(receiveJWT(jwt))
          //   return res;
          // })

        // const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`,options)
        // console.log(token);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  googleLogIn = async () => {
    try{
      const { apiUrl, androidClientId } = getEnvVars;
      
      this.setState({ loading: true });
      // let redirectUrl = AuthSession.getRedirectUrl()
      const config = {
        androidClientId,
        // behavior: 'system',
        scope: ['profile', 'email', 'plus_me']

      }

      // console.log(webClientId)
      // console.log(getEnvVars)
      // let result = await AuthSession.startAsync({
      //   authUrl:
      //     `https://accounts.google.com/o/oauth2/v2/auth?` +
      //     `&client_id=${webClientId}` +
      //     `&redirect_uri=${encodeURIComponent(redirectUrl)}`+
      //     `&response_type=code` +
      //     `&access_type=offline` +
      //     `&scope=${encodeURIComponent('email profile')}`,
      // })
      const result = await Google.logInAsync(config);
      // console.log(result)
      const { type, accessToken, user } = result;
      if(type === 'success') {
        
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({oauth_token:accessToken})
        }

        // console.log('options:', options)
        fetch(apiUrl + '/auth/google',
        options)
        .then(response => {
          response.json()
          
          const jwt = response.headers.map.authorization;
          this.props.dispatch(loginWithJWT(jwt))
        })
        .then(json => {
          // console.log('json response:', json)
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
