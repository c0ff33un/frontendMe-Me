import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const colorTextInput = "#FF6B35";

const styles = {
  email:{
    margin: 8,
    borderColor: 'gray'
  },
  pass:{
    margin: 8, 
    marginTop: 2
  }
}

const validation = (state) =>{
  typeof state.email == String && state.email.indexOf 
}

export default class UserInput extends Component {
  state = {
    user: '',
    pass: '',
    error: false
  };

  login = () => {
    var ans = fetch('https://meemperrapi.herokuapp.com/login', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        user:{
                          email: this.state.user,
                          password: this.state.pass
                        }
                      })
              }).then(response => {
                  if (response.status == 401) {
                    this.props.navigation.navigate("ValidateEmailScreen")
                  } else if (response.status == 201) {
                    this.props.navigation.navigate("FeedScreen")
                  }
                })
                //.then(res => res.headers.map["authorization"])
                .catch(error => console.error('Error:', error))
                //.then(response => console.log('Success:', response));
  }

  render() {
    return (
      <View style={{flex: 2, justifyContent: 'center'}}>
        <TextInput
          mode="outlined"
          label="Email o nombre de usuario"
          error={this.state.error}
          style={ styles.email }
          value={this.state.user}
          selectionColor= { colorTextInput }
          underlineColorAndroid = {colorTextInput}
          onChangeText={user => this.setState({ user })}            
        />
        <TextInput
          mode="outlined"
          label="Contraseña"
          error={this.state.error}
          secureTextEntry={true}
          style={ styles.pass }
          value={this.state.pass}
          onChangeText={pass => this.setState({ pass })}
        />
        <View style = {{alignSelf: 'flex-end', marginBottom: 20, marginRight: 9}}>
          <Text style={ {fontSize: 10} }>¿Olvidaste tú contraseña?</Text>
        </View>
        <Button style={ {margin: 8} } color="#FF6B35" mode="outlined" title="Iniciar Sesión" onPress={this.login}>
          Iniciar Sesión
        </Button>
      </View>
    )
  }
}

