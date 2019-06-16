import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { connect } from "react-redux";
import { login } from '@redux/actions'
import Spinner from "react-native-loading-spinner-overlay";


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
    loading: false
  };

  handleLogin = () => {
    const { email, pass } = this.state
    this.props.dispatch(login(email, pass))
  }

  componentDidMount() {
    this.setState({ email: "ialemusm@unal.edu.co", pass: "Ivan1234" });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Spinner
          visible={this.props.isLoggingIn}
          textContent={"Cargando"}
          textStyle={styles.spinnerTextStyle}
          color={"#FF6B35"}
          textStyle = {{
              color: "white"
          }}
          overlayColor={"linear-gradient(#e66465, #9198e5)"}
          animation={"fade"}
          size={"large"}
        />
        <TextInput
          mode="outlined"
          label="Email"
          error={this.state.error}
          style={styles.email}
          value={this.state.email}
          selectionColor={colorTextInput}
          underlineColorAndroid={colorTextInput}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          mode="outlined"
          label="Contraseña"
          error={this.state.error}
          secureTextEntry={true}
          style={styles.pass}
          value={this.state.pass}
          onChangeText={pass => this.setState({ pass })}
        />
        <View
          style={{ alignSelf: "flex-end", marginBottom: 20, marginRight: 9 }}
        >
          <Text style={{ fontSize: 10 }}>¿Olvidaste tu contraseña?</Text>
        </View>
        <Button
          style={{ margin: 8 }}
          color="#FF6B35"
          mode="outlined"
          title="Iniciar Sesión"
          onPress={this.handleLogin}
        >
          Iniciar Sesión
        </Button>
        <Button
            title="Sign Up"
            onPress={() => this.props.navigation.navigate('SignUp')}
          >
            Sign Up
          </Button>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { isLoggingIn } = state.session
  return { isLoggingIn }
}

export default connect(mapStateToProps)(UserInput)