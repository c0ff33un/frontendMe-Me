import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import UserInput from '../components/UserInput';
import Header from '../components/Header';

class SignUp extends Component {
  render() {
    return(
        <View style={styles.container}>
            <Header />
            <UserInput /> 
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    justifyContent: 'space-between',
  }
});

export default SignUp;