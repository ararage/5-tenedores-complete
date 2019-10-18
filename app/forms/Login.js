import React from "react";
import t from "tcomb-form-native";

import formValidation from "../utils/Validation";

import inputTemplate from "./templates/Input";

export const LoginStruct = t.struct({
  email: formValidation.email,
  password: formValidation.password
});

export const LoginOptions = {
  fields: {
    email: {
      label: "Email (*)",
      error: "Email Invalido",
      template: inputTemplate,
      config: {
        placeholder: "Escribe tu email",
        iconName: "at",
        iconType: "material-community",
        iconSize: 24,
        iconColor: "#b3b3b3"
      }
    },
    password: {
      label: "Contraseña (*)",
      error: "Contraseña invalida",
      template: inputTemplate,
      config: {
        placeholder: "Escribe tu password",
        password: true,
        secureTextEntry: true,
        iconName: "lock-outline",
        iconType: "material-community",
        iconSize: 24,
        iconColor: "#b3b3b3"
      }
    }
  }
};
