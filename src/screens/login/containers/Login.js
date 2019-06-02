import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import UserInput from '../components/UserInput';
import SignUp from '../components/SignUp';
import Header from '../components/Header';

class Login extends Component {
  render() {
    return(
        <View style={styles.container}>
            <Header />
            <UserInput navigation={this.props.navigation} />
            <SignUp navigation={this.props.navigation} /> 
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
});

export default Login;