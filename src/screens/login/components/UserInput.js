import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';

export default class UserInput extends Component {
  state = {
    pass: '',
    user: ''
  };

  render() {
    return (
      <View>
        <TextInput
          mode="outlined"
          label="Email o nombre de usuario"
          style={ {margin: 8} }
          value={this.state.user}
          onChangeText={user => this.setState({ user })}
        />
        <TextInput
          mode="outlined"
          label="Contraseña"
          secureTextEntry={true}
          style={ {margin: 8, marginTop: 2} }
          value={this.state.pass}
          onChangeText={pass => this.setState({ pass })}
        />
        <Button style={ {marginTop: 4, paddingLeft: 8} } mode="text" onPress={() => console.log('Pressed')}>
          <Text style={ {fontSize: 8} }>¿Olvidaste tú contraseña?</Text>
        </Button>
        <Button style={ {margin: 8} } mode="outlined" onPress={() => console.log('Pressed')}>
          Iniciar Sesión
        </Button>
      </View>
    )
  }
}