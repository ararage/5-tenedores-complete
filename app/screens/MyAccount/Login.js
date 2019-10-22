import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  SafeAreaView
} from "react-native";
import { Image, Button, Divider, SocialIcon } from "react-native-elements";
import Toast from "react-native-easy-toast";

import t from "tcomb-form-native";
const Form = t.form.Form;

import { LoginStruct, LoginOptions } from "../../forms/Login";

import * as firebase from "firebase";
import * as Facebook from "expo-facebook";

import { FacebookAPI } from "../../utils/Social";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginStruct: LoginStruct,
      loginOptions: LoginOptions,
      loginData: {
        email: "",
        password: ""
      },
      loginErrorMessage: ""
    };
  }

  login = () => {
    const validate = this.refs.loginForm.getValue();
    if (!validate) {
      console.log("formulario Incorrecto");
      this.setState({ loginErrorMessage: "Los datos capturados son erroneos" });
      return;
    }
    this.setState({ loginErrorMessage: "" });
    firebase
      .auth()
      .signInWithEmailAndPassword(validate.email, validate.password)
      .then(() => {
        this.refs.toastLogin.show("Login correcto", 200, () => {
          this.props.navigation.goBack();
        });
      })
      .catch(e => {
        const err = {
          "auth/wrong-password": "La contraseña es incorrecta",
          "auth/user-not-found": "El usuario no existe"
        };
        this.refs.toastLogin.show(err[e.code], 200);
      });
  };

  loginFacebook = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Facebook.logInWithReadPermissionsAsync(
        FacebookAPI.application_id,
        { permissions: FacebookAPI.permissions }
      );
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const credentials = firebase.auth.FacebookAuthProvider.credential(
          token
        );
        firebase
          .auth()
          .signInWithCredential(credentials)
          .then(() => {
            this.refs.toastLogin.show("Login Correcto", 100, () => {
              this.props.navigation.goBack();
            });
          });
      } else {
        this.refs.toastLogin.show("Inicio de sesión cancelado", 300);
      }
    } catch ({ message }) {
      this.refs.toastLogin.show("Error desconocido, intentelo más tarde", 300);
    }
  };

  onChangeFormLogin = loginData => {
    this.setState({ loginData: loginData });
  };

  render() {
    const { loginStruct, loginOptions, loginErrorMessage } = this.state;
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
          <View style={styles.viewForm}>
            <Form
              ref="loginForm"
              type={loginStruct}
              options={loginOptions}
              value={this.state.loginData}
              onChange={loginData => {
                this.onChangeFormLogin(loginData);
              }}
            />
            <Button
              title="Login"
              buttonStyle={styles.buttonLoginContainer}
              onPress={this.login}
            />
            <Text style={styles.textRegister}>
              ¿Aún no tienes cuenta? { " " }
              <Text style={styles.buttonRegister} onPress={()=>this.props.navigation.navigate('Register')}>Regístrate</Text>
            </Text>

            <Text style={styles.loginErrorMessage}>{loginErrorMessage}</Text>
            <Divider style={styles.divider} />
            <SocialIcon
              title="Iniciar sesión con Facebook"
              button
              type="facebook"
              onPress={this.loginFacebook}
            />
          </View>
          <Toast
            ref="toastLogin"
            position="bottom"
            positionValue={400}
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
  containerLogo: {
    alignItems: "center"
  },
  logo: {
    width: 300,
    height: 150
  },
  viewForm: {
    marginTop: 50
  },
  buttonLoginContainer: {
    backgroundColor: "#00a680",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  loginErrorMessage: {
    color: "#f00",
    textAlign: "center",
    marginTop: 20
  },
  divider: {
    backgroundColor: "#00a680",
    marginBottom: 20
  },
  textRegister:{
    marginTop:15,
    marginLeft:10,
    marginRight:10
  },
  buttonRegister: {
    color:'#00a680',
    fontWeight:'bold'
  }
});

export default Login;
