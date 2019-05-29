import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import SignUp from '../containers/SignUp';

const colorTextInput = "#FF6B35";

function randomStringGenerator(){
  var length           = Math.floor(Math.random() * 45);
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function hasher(pass){
  var sha256 = require('js-sha256').sha256;
  return sha256(pass);
}

function signUp(username, pass, age) {
  var rand = randomStringGenerator();
  var hashPass = hasher(rand + pass);
  fetch('https://meemperrapi.herokuapp.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      handle: username,
      age: age,
      pass: hashPass,
      password_salt: rand 
    })
  })
}

export default class UserInput extends Component {
  state = {
    user: '',
    pass: '',
    repass: '',
    age: ''
  };

  render() {
    return (
      <View>
          <View style={{marginLeft: 8}}>
            <Text>Ingresa tu nombre de usuario</Text>
          </View>
          <TextInput
            mode="outlined"
            style={ {margin: 8} }
            value={this.state.user}
            selectionColor= { colorTextInput }
            underlineColorAndroid = {colorTextInput}
            onChangeText={user => this.setState({ user })}
          />
          <View style={{marginLeft: 8}}>
            <Text>Ingresa tu edad</Text>  
          </View>
          {/* Se debe utilizar date picker */}
          <TextInput 
            mode="outlined"
            style={ {margin: 8} }
            value={this.state.age}
            selectionColor= { colorTextInput }
            underlineColorAndroid = {colorTextInput}
            onChangeText={age => this.setState({ age })}
          />
          <View style={{marginLeft: 8}}>
            <Text>Ingresa tu contraseña</Text>
          </View>
          <TextInput
            mode="outlined"
            style={ {margin: 8} }
            value={this.state.pass}
            selectionColor= { colorTextInput }
            underlineColorAndroid = {colorTextInput}
            onChangeText={pass => this.setState({ pass })}
          />
          <View style={{marginLeft: 8}}>
            <Text>Ingresa nuevamente tu contraseña</Text>
          </View>
          <TextInput
            mode="outlined"
            style={ {margin: 8} }
            value={this.state.repass}
            selectionColor= { colorTextInput }
            underlineColorAndroid = {colorTextInput}
            onChangeText={repass => this.setState({ repass })}
          />
        
        <Button style={ {margin: 8} } color="#FF6B35" mode="outlined" title="Registrarse" 
          onPress = {() => signUp(this.state.user, this.state.pass, this.state.age)}
        > Registrarse </Button>
      </View>
    )
  }
}
