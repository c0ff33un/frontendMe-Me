import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { connect } from "react-redux";
import { login } from '@redux/actions'
import getEnvVars from 'me-me/environment'


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
    user: "",
    pass: "",
    error: false
  };

  handleLogin = () => {
    const { apiUrl } = getEnvVars

    console.log(apiUrl + '/login')
    var ans = fetch(apiUrl + '/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          email: this.state.user,
          password: this.state.pass
        }
      })
    })
    .then(response => {
      const jwt = response.headers.map.authorization;
      if (response.status == 401) {
        this.props.navigation.navigate("ValidateEmail");
      } else if (response.status == 201) {
        this.props.login(jwt);
      }
      return response;
    })
    .catch(error => console.error("Error:", error));
    
  };

  componentDidMount() {
    this.setState({ user: "ialemusm@unal.edu.co", pass: "Ivan1234" })
  }

  render() {

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TextInput
          mode="outlined"
          label="Email"
          error={this.state.error}
          style={styles.email}
          value={this.state.user}
          selectionColor={colorTextInput}
          underlineColorAndroid={colorTextInput}
          onChangeText={user => this.setState({ user })}
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

const mapStateToProps = state => {
  return { state }
}

export default connect(
  mapStateToProps,
  { login }
)(UserInput);
