import React, { Component } from "react";
import { StyleSheet, SafeAreaView, ScrollView , ActivityIndicator } from "react-native";
import { Button, Text, Image } from "react-native-elements";

import Toast from "react-native-easy-toast";

import t from "tcomb-form-native";
const Form = t.form.Form;

// Forms
import { RegisterStruct, RegisterOptions } from "../../forms/Register";

// Firebase
import * as firebase from "firebase";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      registerStruct: RegisterStruct,
      registerOptions: RegisterOptions,
      formData: {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
      },
      formErrorMessage: ""
    };
  }

  register = () => {
    const { password, passwordConfirmation } = this.state.formData;
    if (password == passwordConfirmation) {
      const validate = this.refs.registerForm.getValue();
      if (validate) {
        this.setState({ formErrorMessage: "" });
        firebase
          .auth()
          .createUserWithEmailAndPassword(validate.email, validate.password)
          .then(res => {
            this.refs.toast.show("Registro correcto", 200, () => {
              this.props.navigation.goBack();
            });
          })
          .catch(err => {
            console.log("El email ya esta en uso");
            this.refs.toast.show("El mail ya esta en uso", 2500);
          });
      } else {
        this.setState({
          formErrorMessage: "Formulario invalido"
        });
      }
    } else {
      this.setState({
        formErrorMessage: "Las contraseñas no son iguales"
      });
    }
  };

  onChangeFormRegister = formValue => {
    this.setState({ formData: formValue });
  };

  render() {
    const {
      registerStruct,
      registerOptions,
      formData,
      formErrorMessage
    } = this.state;

    return (
      <SafeAreaView style={styles.container}>  
        <ScrollView
          style={styles.viewBody}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <Image
              source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
            containerStyle={styles.containerLogo}
            style={styles.logo}
            PlaceholderContent={<ActivityIndicator />}
            resizeMode="contain"
          />
          <Form
            ref="registerForm"
            type={registerStruct}
            options={registerOptions}
            value={formData}
            onChange={formValue => this.onChangeFormRegister(formValue)}
          />
          <Button
            title="Unirse"
            onPress={this.register}
            buttonStyle={styles.buttonRegister}
          />
          <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
          <Toast
            ref="toast"
            position="bottom"
            positionValue={250}
            fadeInDuration={1000}
            fadeOutDuration={1000}
            opacity={0.8}
            textStyle={{ color: "#fff" }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viewBody: {
    flex: 1,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 40
  },
  buttonRegister: {
    backgroundColor: "#00a680",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  formErrorMessage: {
    color: "#f00",
    textAlign: "center",
    marginTop: 30
  },
  containerLogo: {
    alignItems: "center",
    marginBottom:30
  },
  logo: {
    width: 300,
    height: 150,
  },
});

export default Register;
