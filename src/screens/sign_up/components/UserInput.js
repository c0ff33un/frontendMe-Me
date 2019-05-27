import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import SignUp from '../containers/SignUp';

const colorTextInput = "#FF6B35";

function signUp(username, pass, age) {
  fetch('https://meemperrapi.herokuapp.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      handler: username,
      age: age,
      pass: pass,
      password_salt: pass 
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
          onPress = {() => fetch('https://meemperrapi.herokuapp.com/users', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              handle: this.state.user,
                              age: this.state.age,
                              pass: this.state.pass,
                              password_salt: this.state.pass 
                            })
                          }
          )}> Registrarse </Button>
      </View>
    )
  }
}
