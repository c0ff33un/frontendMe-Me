import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';

const colorTextInput = "#FF6B35";

export default class UserInput extends Component {
  state = {
    user: '',
    pass: '',
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
            <Text>Ingresa tu correo electrónico</Text>
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
            <Text>Ingresa tu contraseña</Text>
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
            <Text>Ingresa nuevamente tu contraseña</Text>
          </View>
          <TextInput
            mode="outlined"
            style={ {margin: 8} }
            value={this.state.user}
            selectionColor= { colorTextInput }
            underlineColorAndroid = {colorTextInput}
            onChangeText={user => this.setState({ user })}
          />
        
        <Button style={ {margin: 8} } color="#FF6B35" mode="outlined" title="Registrarse" onPress={() => console.log(this)}>
          Registrarse
        </Button>
      </View>
    )
  }
}
