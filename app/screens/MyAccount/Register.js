import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-elements';

import t from 'tcomb-form-native';
const Form = t.form.Form;

// Forms 
import { RegisterStruct , RegisterOptions} from '../../forms/Register'

// Firebase
import * as firebase from 'firebase';
 
class Register extends Component {

  constructor(){
    super();
    this.state = {
      registerStruct: RegisterStruct,
      registerOptions: RegisterOptions,
      formData: {
        name:"",
        email:"",
        password:"",
        passwordConfirmation:""
      },
      formErrorMessage:""
    }
  }

  register = () => {
    const { password, passwordConfirmation } = this.state.formData;
    if(password == passwordConfirmation){
      const validate = this.refs.registerForm.getValue();
      if(validate){
        this.setState({formErrorMessage:""});
        firebase
        .auth()
        .createUserWithEmailAndPassword(validate.email, validate.password)
        .then(res=>{
          console.log("VALIDADO")
        }).catch(err=>{
          console.log("El email ya esta en uso")
        })
      }else{
        this.setState({
          formErrorMessage:"Formulario invalido"
        })
        
      }
    }else{
      this.setState({
        formErrorMessage:"Las contraseñas no son iguales"
      })
    }
  }

  onChangeFormRegister = (formValue) =>{
    this.setState({formData:formValue})
  }

  render() {

    const { registerStruct, registerOptions, formData, formErrorMessage } = this.state;

    return (
      <View style={styles.viewBody}>
        <Form 
          ref="registerForm" 
          type={registerStruct} 
          options={registerOptions} 
          value={formData}
          onChange={(formValue) => this.onChangeFormRegister(formValue)}
          />
        <Button 
          title="Unirse" 
          onPress={this.register} 
          buttonStyle ={styles.buttonRegister}/>
        <Text style={styles.formErrorMessage}>{formErrorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 40,
    marginRight: 40
  },
  buttonRegister:{
    backgroundColor: "#00a680",
    marginTop:20,
    marginLeft:10,
    marginRight:10
  },
  formErrorMessage:{
    color:'#f00',
    textAlign:'center',
    marginTop:30
  }
});

export default Register;
