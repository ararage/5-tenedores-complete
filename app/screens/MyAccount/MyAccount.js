import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";

import * as firebase from "firebase";

class MyAccount extends Component {
  constructor() {
    super();
    this.state = {
      login: false
    };
  }

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ login: true });
        return;
      }
      this.setState({ login: false });
    });
  }

  /*
    Navigate to Screen
  */
  goToScreen = nameScreen => {
    this.props.navigation.navigate(nameScreen);
  };

  logout = () => {
    firebase.auth().signOut();
  };

  render() {
    const { login } = this.state;
    if (login) {
      return (
        <View style={styles.viewBody}>
          <Text>Estas logueado correctamente</Text>
          <Button title="Cerrar Sesion" onPress={() => this.logout()} />
        </View>
      );
    }
    return (
      <View style={styles.viewBody}>
        <Text>MyAccount</Text>
        <Button title="Registro" onPress={() => this.goToScreen("Register")} />
        <Button title="Login" onPress={() => this.goToScreen("Login")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default MyAccount;
