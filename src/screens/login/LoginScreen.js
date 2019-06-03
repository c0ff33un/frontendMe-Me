import React, { Component } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import UserInput from './components/UserInput';
import SignUp from './components/SignUp';
import Header from './components/Header';

class LoginScreen extends Component {
  render() {
    return(
        <ScrollView style={styles.container}>
            <Header />
            <UserInput navigation={this.props.navigation} />
            <SignUp navigation={this.props.navigation} /> 
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
});

export default LoginScreen
