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
          <TextInput
            mode="outlined"
            label="Email o nombre de usuario"
            style={ {margin: 8} }
            value={this.state.user}
            selectionColor= { colorTextInput }
            underlineColorAndroid = {colorTextInput}
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
        <View style = {{alignSelf: 'flex-end', marginBottom: 20}}>
          <Text style={ {fontSize: 10} }>¿Olvidaste tú contraseña?</Text>
        </View>
        <Button style={ {margin: 8} } color="#FF6B35" mode="outlined" title="Iniciar Sesión" onPress={() => console.log('Pressed')}>
          Iniciar Sesión
        </Button>
      </View>
    )
  }
}
