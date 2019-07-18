import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Text, DefaultTheme, DarkTheme} from "react-native-paper";
import { connect } from "react-redux";
import { login } from '@redux/actions';
import Spinner from "react-native-loading-spinner-overlay";
// import { Font } from 'expo';
// import * as Font from 'expo-font';

const colorTextInput = "#FF6B35";

const styles = {
  email: {
    margin: 8,
    borderColor: "gray"
  },
  pass: {
    margin: 8,
    marginTop: 2
  }
};

const validation = state => {
  typeof state.email == String && state.email.indexOf;
};

class UserInput extends Component {
  state = {
    email: "",
    pass: "",
    error: false,
    firstError: false,
    loading: false
  };

  handleLogin = () => {
    this.setState({ firstError: true })
    const { email, pass } = this.state
    this.props.dispatch(login(email, pass))
  }

  componentDidMount() {
    this.setState({ email: "jc4@quickmail.in", pass: "12345678" });    

    // Font.loadAsync({
    //   'noto-sans': require('assets/fonts/NotoSans-Regular.ttf'),
    // });
  }

  render() {

    if (this.props.loginError && this.state.firstError) {
      alert("Login error")
    }

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner
          visible={this.props.isLoggingIn}
          textContent={"Cargando"}
          textStyle={styles.spinnerTextStyle}
          color={"#F6BD60"}
          textStyle = {{
              color: "white"
          }}
          overlayColor={"rgba(39,39,39,1)"}
          animation={"fade"}
          size={"large"}
        />
        <TextInput
          mode="outlined"
          label="Email"
          error={this.state.error}
          style={styles.email}
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              primary: '#6290C3',
              accent: '#272727',
              background: '#FDFFFC',
              text: '#272727',
              disabled: '#FDFFFC',
              placeholder: '#272727',
            }
          }}
        />
        <TextInput
          mode="outlined"
          label="Contraseña"
          error={this.state.error}
          secureTextEntry={true}
          style={styles.pass}
          value={this.state.pass}
          onChangeText={pass => this.setState({ pass })}
          theme={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              primary: '#6290C3',
              accent: '#272727',
              background: '#FDFFFC',
              text: '#272727',
              disabled: '#FDFFFC',
              placeholder: '#272727',
            }
          }}
        />
        <View
          style={{ alignSelf: "flex-end", marginBottom: 20, marginRight: 9 }}
        >
          <Text style={{ fontSize: 14, }} onPress={(e)=>{e.preventDefault(); this.props.navigation.navigate('SignUp')}}>¿Olvidaste tu contraseña?</Text>
        </View>
        <Button
          mode="contained"
          dark={true}
          title="Iniciar Sesión"
          onPress={this.handleLogin}
          theme={{
            ...DefaultTheme,
            colors: {
              primary: '#6290C3',
              accent: '#F6BD60',
              background: '#FDFFFC',
              surface: '#FDFFFC',
              text: '#FDFFFC',
              disabled: '#FDFFFC',
              placeholder: '#FDFFFC',
              backdrop: '#FDFFFC',
            }
          }}
        >
          Iniciar Sesión
        </Button>
        <Button
            title="Sign Up"
            onPress={() => this.props.navigation.navigate('SignUp')}
            dark={true}
            theme={{
              ...DefaultTheme,
              colors: {
                primary: '#6290C3',
                accent: '#F6BD60',
                background: '#FDFFFC',
                surface: '#FDFFFC',
                text: '#FDFFFC',
                disabled: '#FDFFFC',
                placeholder: '#FDFFFC',
                backdrop: '#FDFFFC',
              }
            }}
          >
            Regístrate
          </Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoggingIn, jwt, loginError } = state.session
  return { isLoggingIn, jwt, loginError }
}

export default connect(mapStateToProps)(UserInput)