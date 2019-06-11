import React, { Component } from 'react';
import { StyleSheet,View,ScrollView, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import {Crypt, keyManager, RSA} from 'hybrid-crypto-js';
import DatePicker from 'react-native-datepicker';


const colorTextInput = "#FF6B35";

const themes = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2EC4B6',
    accent: '#FDFFFC',
    background : "#272727"
  }
}; 

const styles = {
  input:{
    border: 20,
    margin: 8,
    background: "#272727"
  },
  error: {
    color: "#272727",
    fontStyle: "italic"
  },
  container:{
    flex: 1
  }
}



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
  
  state = {
    user: '',
    pass: '',
    repass: '',
    email: '',
    birthday: '', //YYYY-MM-DD  14 <= X <= 100,
    errorUser: false,
    errorDate: false,
    errorEmail: false,
    errorPass: false,
    errorRePass: false,
    loading: false
  };


  signUp = () => {
    //var cryptoPass = encrypt(pass);
    this.setState({ loading: true })
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
    })
    .then(response => { 
      if(response.ok){
        console.log('Success', response);
        this.setState({ loading: false });
        this.props.navigation.navigate('ValidateEmail');
      } else {
        console.log('Error:', response)
      }
    })
    .catch( error => {
      this.setState({ loading: false });
      return error;
    })
  }

  validate = (input,value) => {
  switch(input){
    case "email":
      emailRestrictions = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if(value){
        if(value.match(emailRestrictions)) {
          this.setState(() => ({ errorEmail: false }))
        } else {
          this.setState(() => ({ errorEmail: true }))
        }
      }else{
        this.setState(() => ({ errorEmail: false }))
      }
      break;

    case "user":
      usernameRestrictions = /^([a-zA-Z0-9]+)$/;
          
      if(value){
        if( 5 <= value.length && value.length <= 20 && value.match(usernameRestrictions)) {
          this.setState(() => ({ errorUser: false }))
        } else {
          this.setState(() => ({ errorUser: true }))
        }
      }else{
        this.setState(() => ({ errorUser: false }))
      }
      break;

    case "pass":
      if(value){
        if( 8 <= value.length && value.length <= 30) {
            this.setState(() => ({ errorPass: false }))
        } else {
            this.setState(() => ({ errorPass: true }))
          }
      }else{
        this.setState(() => ({ errorPass: false }))
      }
      break;

    case "repass":
      if(value){
        if( value == this.state.pass) {
            this.setState(() => ({ errorRePass: false }))
        } else {
            this.setState(() => ({ errorRePass: true }))
          }
      }else{
        this.setState(() => ({ errorRePass: false }))
      }
      break;

    case "birthday":
      if(value){
        if( Number(value.substr(0,4)) < 2004 ) {
            this.setState(() => ({ errorDate: false }))
        } else {

            this.setState(() => ({ errorDate: true }))
          }
      }else{
        this.setState(() => ({ errorDate: false }))
      }
      break;
    default:
      break;
  }
}

  render() {
    return (
        <View>
          <View style={{marginLeft: 8}}>
            <Text>Ingresa tu nombre de usuario</Text>
          </View>
          <TextInput
            theme={themes}
            error={this.state.errorUser}
            mode="outlined"
            style={ {margin: 8} }
            value={this.state.user}
            selectionColor= { colorTextInput }
            underlineColorAndroid = {colorTextInput}
            onChangeText={user => {this.setState({ user }); this.validate("user",user)}}
          />
          {this.state.errorUser ? 
          <View style={{marginLeft: 8}}><Text style={styles.error} theme={themes}> El nombre de usuario debe tener entre 5 - 20 caracteres</Text></View> :
          null }

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
          onDateChange={birthday => {this.setState({birthday: birthday}); this.validate("birthday", birthday) } }
        />
          {this.state.errorDate ? 
          <View style={{marginLeft: 8}}><Text style={styles.error} theme={themes}> Debes ser mayor de 14 años para usar la aplicación</Text></View> :
          null }

          <View style={{marginLeft: 8}}>
            <Text>Ingresa tu email</Text>
          </View>
          <TextInput
            theme={themes}
            error={this.state.errorEmail}
            mode="outlined"
            theme={themes}
            style={ styles.input }
            value={this.state.email}
            selectionColor= { colorTextInput }
            underlineColorAndroid = {colorTextInput}
            onChangeText={email => {this.setState({ email }); this.validate("email", email); }}
          />
          {this.state.errorEmail ? 
          <View style={{marginLeft: 8}}><Text style={styles.error} theme={themes}> Por favor escribe un email valido</Text></View> :
          null }

          <View style={{marginLeft: 8}}>
            <Text>Ingresa tu contraseña</Text>
          </View>
          <TextInput
            theme={themes}
            error={this.state.errorPass}
            mode="outlined"
            style={ {margin: 8} }
            value={this.state.pass}
            selectionColor= { colorTextInput }
            underlineColorAndroid = {colorTextInput}
            onChangeText={pass => { this.setState({ pass }); this.validate("pass",pass)}}
          />
          {this.state.errorPass ? 
          <View style={{marginLeft: 8}}><Text style={styles.error} theme={themes}> La contraseña debe tener entre 8 - 30 caracteres</Text></View> :
          null }

          <View style={{marginLeft: 8}}>
            <Text>Ingresa nuevamente tu contraseña</Text>
          </View>
          <TextInput
            theme={themes}
            error={this.state.errorRePass}
            mode="outlined"
            style={ {margin: 8} }
            value={this.state.repass}
            selectionColor= { colorTextInput }
            underlineColorAndroid = {colorTextInput}
            onChangeText={repass => {this.setState({ repass }); this.validate("repass",repass)} }
          />
          {this.state.errorRePass ? 
          <View style={{marginLeft: 8}}><Text style={styles.error} theme={themes}> Las contraseñas no coinciden </Text></View> :
          null }
        
          <Button 
            style={ {margin: 8} } 
            color="#FF6B35" 
            mode="outlined" 
            title="Registrarse" 
            onPress = {this.signUp}
            disabled = {this.state.loading}
            loading = {this.state.loading}
          > 
            Registrarse 
          </Button>
        </View>
    )
  }
}
