import React from 'react';
import t from 'tcomb-form-native';

import formValidation from '../utils/Validation'

import inputTemplate from './templates/Input';

export const RegisterStruct = t.struct({
    name: t.String,
    email: formValidation.email,
    password: formValidation.password,
    passwordConfirmation: formValidation.password
});

export const RegisterOptions = {
    fields:{
        name: {
            label: 'Nombre (*)',
            error:'Nombre invalido',
            template: inputTemplate,
            config:{
                placeholder: 'Nombre y apellidos',
                iconName:'account-outline',
                iconType:'material-community',
                iconSize:24,
                iconColor:"#b3b3b3"
            }
        },
        email: {
            label: 'Email (*)',
            error: 'Email Invalido',
            template: inputTemplate,
            config:{
                placeholder: 'Escribe tu email',
                iconName:'at',
                iconType:'material-community',
                iconSize:24,
                iconColor:"#b3b3b3"
            }
        },
        password: {
            label: 'Contraseña (*)',
            error: 'Contraseña invalida',
            template: inputTemplate,
            config:{
                placeholder: 'Escribe tu password',
                password: true,
                secureTextEntry: true,
                iconName:'lock-outline',
                iconType:'material-community',
                iconSize:24,
                iconColor:"#b3b3b3"
            }
        },
        passwordConfirmation:{
            label: 'Repetir Contraseña (*)',
            error: 'Contraseña Invalida',
            template: inputTemplate,
            config:{
                password: true,
                secureTextEntry: true,
                placeholder: 'Repite tu contraseña',
                iconName:'lock-reset',
                iconType:'material-community',
                iconSize:24,
                iconColor:"#b3b3b3"
            }
        }
    }
}
