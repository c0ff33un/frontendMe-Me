import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { SocialIcon } from 'react-native-elements'


export default class SignUp extends Component {

  
  render(){
    return (
      <View>
        <View style = {{alignSelf: 'center', marginTop: 8, marginBottom: 8}}>
          <Text>Or</Text>
        </View>
        <SocialIcon
          title='Sign In With Facebook'
          button
          type='facebook'
        />
        <SocialIcon
          title='Sign In With Google'
          button
          type='google-plus-official'
        />
        <View style = {{alignSelf: 'flex-end'}}>
          <Text>
            Sign Up
          </Text>
        </View>
      </View>
    );
  }
}
