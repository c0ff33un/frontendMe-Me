import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import UserInput from '../components/UserInput';
import SignUp from '../components/SignUp';
import Header from '../components/Header';

class Login extends Component {
  render() {
    return(
        <ScrollView style={styles.container}>
            <Header />
            <UserInput />
            <SignUp navigation={this.props.navigation} /> 
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  /*container:{
    justifyContent: 'space-between',
  }*/
});

export default Login;