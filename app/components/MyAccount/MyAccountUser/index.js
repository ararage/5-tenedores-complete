import React, { Component } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Button, Image } from 'react-native-elements';

// Components
import UserInfo from './UserInfo';

class MyAccountUser extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <SafeAreaView style={styles.container}>  
                <ScrollView
                    contentContainerStyle={styles.viewBody}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    >
                    <UserInfo />
                    <Button title="Cerrar Sesion" onPress={() => this.logout()} />
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
      backgroundColor: "#fff",
      alignItems:'center',
      marginTop: 10
    }
  });

export default MyAccountUser;