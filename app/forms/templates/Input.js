import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Input, Icon } from 'react-native-elements'

function inputTemplate(locals){
    return(<View style={styles.viewContainer}>
        <Input 
            placeholder={locals.config.placeholder} 
            password={locals.config.password} 
            secureTextEntry={locals.config.secureTextEntry}
            rightIcon={
                <Icon 
                    name={locals.config.iconName} 
                    type={locals.config.iconType}
                    size={locals.config.iconSize}
                    color={locals.config.iconColor} />}
            // Set input value from the "Form" onChange function
            onChange={value => locals.onChange(value)}
        ></Input>
    </View>);
}

const styles = StyleSheet.create({
    viewContainer:{
        marginTop: 12,
        marginBottom: 12,
    }
})

export default inputTemplate;
