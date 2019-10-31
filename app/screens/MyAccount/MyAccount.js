import React, { Component } from "react";

// Firebase
import * as firebase from "firebase";

// Components
import MyAccountGuest from "../../components/MyAccount/MyAccountGuest";
import MyAccountUser from "../../components/MyAccount/MyAccountUser";

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
      return <MyAccountUser />;
    }
    return (
      // Pass goToScreen function to MyAccountGuest component
      <MyAccountGuest goToScreen={this.goToScreen} />
    );
  }
}

export default MyAccount;
