import React, { Component } from 'react'
import { Text, View, Link } from 'react-native'
import {Button} from 'react-native-paper'
import { SocialIcon } from 'react-native-elements'

export default class SignUp extends Component {
  render(){
    return (
      <View style={{flex: 2, justifyContent: 'center'}}>
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
        <Button
          title="Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}>
            Sign Up
        </Button>
      </View>
    );
  }
}
