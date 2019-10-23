import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";

// Components
import UpdateUserInfo from "./UpdateUserInfo";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      userInfo: {}
    };
  }

  componentDidMount = async () => {
    await this.getUserInfo();
  };

  getUserInfo = () => {
    /*
      Initialize the state object with the Data from the Current User
      retrieved from FireBase (displayName, email, photoURL)
    */
    const user = firebase.auth().currentUser;
    user.providerData.forEach(userInfo => {
      this.setState({
        userInfo: userInfo
      });
    });
  };

  checkUserAvatar = photoURL => {
    return photoURL
      ? photoURL
      : "https://api.adorable.io/avatars/285/abott@adorable.png";
  };

  updateUserDisplayName = newDisplayName => {
    console.log("Userinfo: ", newDisplayName);
  };

  returnUpdateUserInfoComponent = userInfoData => {
    /*
      Check if the user info has been loaded, if the userInfoData (this.state.userInfo)
      has the property uid you can load the Component UpdateUserInfo passing the
      userInfo retrieved from Firebase and the function updateUserDisplayName
      for updating data in the OverlayOneInput Component

      @param {Object} userInfoData  
    */
    if (userInfoData.hasOwnProperty("uid")) {
      return (
        <View>
          <UpdateUserInfo
            userInfo={this.state.userInfo}
            updateUserDisplayName={this.updateUserDisplayName}
          />
        </View>
      );
    }
  };

  render() {
    // Data from Firebase loaded from state object in the Constructor
    const { displayName, email, photoURL } = this.state.userInfo;
    return (
      <View>
        <View style={styles.viewBody}>
          <Avatar
            rounded
            size="large"
            source={{
              uri: this.checkUserAvatar(photoURL)
            }}
            containerStyle={styles.userInfoAvatar}
          />
          <Text style={styles.displayName}>{displayName}</Text>
          <Text>{email}</Text>
        </View>
        {this.returnUpdateUserInfoComponent(this.state.userInfo)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: "#f2f2f2"
  },
  userInfoAvatar: {
    marginRight: 20
  },
  displayName: {
    fontWeight: "bold"
  }
});

export default UserInfo;
