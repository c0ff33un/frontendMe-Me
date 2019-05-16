import React, { Component } from 'react'
import { View } from 'react-native'
import UserInput from '../components/UserInput';
import SignUp from '../components/SignUp';
import Header from '../components/Header'

class Login extends Component {
  render() {
    return(
        <View>
            <Header />
            <UserInput />
            <SignUp /> 
        </View>
    )
  }
}

export default Login;