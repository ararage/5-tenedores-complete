import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from 'firebase';

class UserInfo extends Component{
    constructor(state){
        super(state);
        this.state = {
            userInfo:{}
        }
    }

    componentDidMount = async () =>{
        await this.getUserInfo();
    }

    getUserInfo = () =>{
        const user = firebase.auth().currentUser;
        user.providerData.forEach(userInfo=>{
            this.setState({
                userInfo:userInfo
            });
        });
        console.log(this.state.userInfo)
        
    }

    render(){
        const { displayName}  = this.state.userInfo;
        console.log(displayName)
        return(
            <View style={styles.viewBody}> 
                <Avatar 
                    rounded
                    size="large"
                    source={{uri:"https://api.adorable.io/avatars/285/abott@adorable.png"}}
                    containerStyle={styles.userInfoAvatar}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        alignItems:'center',
        flexDirection:'row'
    },
    userInfoAvatar:{
        marginRight:20,
        
    }
})

export default UserInfo;