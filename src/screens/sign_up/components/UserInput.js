import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';
import {Crypt, keyManager, RSA} from 'hybrid-crypto-js';
import DatePicker from 'react-native-datepicker';


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

function encrypt(message){
  var publicKey = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDCQAh4sqSvbF5HoULNGHSvaGrr\nGqMIYBxCEdSq3A8DL2t+Jz+50oeo2OJqNy+KErCn/UPEvk9Nm+I9mqaSrz1009Jl\nf6dukknLt2KJJjyVfaU6xmfXKSpxcya1jmdFRjVmvyMJyFocGmigT0ofkbDU6cXZ\nSvMZJp6tF345KMbuDQIDAQAB\n-----END PUBLIC KEY-----\n";
  // Basic initialization
  var crypt = new Crypt();
  var rsa = new RSA();

  // Increase amount of entropy
  var entropy = "05bd98a0bd886dd3";
  var crypt = new Crypt({entropy: entropy});

  // Encryption with one public RSA key
  var encrypted = crypt.encrypt(publicKey, message);
  return encrypted;
}


export default class UserInput extends Component {
  signUp = () => {
    //var cryptoPass = encrypt(pass);
    var ans = fetch('https://meemperrapi.herokuapp.com/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user:{
          handle: this.state.user,
          email: this.state.email,
          birthday: this.state.birthday,
          password: this.state.pass
        }
      })
    }).then(response => {
      if(response.ok){
        console.log('Success', response)
        this.props.navigation.navigate('ValidateEmailScreen');
      } else {
        console.log('Error:', response)
      }
    })
  }

  state = {
    user: '',
    pass: '',
    repass: '',
    email: '',
    birthday: '' //YYYY-MM-DD  14 <= X <= 100

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
            <Text>Ingresa tu fecha de nacimiento</Text>  
          </View>
          {/* Se debe utilizar date picker */}
          <DatePicker
          style={{width: 400, margin: 8}}
          date={this.state.birthday}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="1919-05-01"
          confirmBtnText="Confirmar"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              width:0,
              height:0,
            },
            dateInput: {
              height: 30,
              width: 400 
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={(birthday) => {this.setState({birthday: birthday})}}
        />
          <View style={{marginLeft: 8}}>
            <Text>Ingresa tu email</Text>
          </View>
          <TextInput
            mode="outlined"
            style={ {margin: 8} }
            value={this.state.email}
            selectionColor= { colorTextInput }
            underlineColorAndroid = {colorTextInput}
            onChangeText={email => this.setState({ email })}
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
          onPress = {this.signUp}
        > Registrarse </Button>
      </View>
    )
  }
}
