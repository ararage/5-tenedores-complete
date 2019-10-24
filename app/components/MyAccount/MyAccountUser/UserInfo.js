import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Avatar } from "react-native-elements";
import * as firebase from "firebase";
import Toast, { DURATION } from "react-native-easy-toast";

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
    /**
     * Initialize the state object with the Data from the Current User
     * retrieved from FireBase (displayName, email, photoURL)
     */
    const user = firebase.auth().currentUser;
    user.providerData.forEach(userInfo => {
      this.setState({
        userInfo: userInfo
      });
    });
  };

  reAuthenticate = currentPassword => {
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(credentials);
  };

  checkUserAvatar = photoURL => {
    return photoURL
      ? photoURL
      : "https://api.adorable.io/avatars/285/abott@adorable.png";
  };

  updateUserDisplayName = async newDisplayName => {
    /**
     * Update User info using the Firebase API and retrieve the new Data
     *
     * @param {Object} newDisplayName
     */
    const update = {
      displayName: newDisplayName
    };
    await firebase.auth().currentUser.updateProfile(update);
    this.getUserInfo();
  };

  updateUserEmail = (newEmail, password) => {
    this.reAuthenticate(password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updateEmail(newEmail)
          .then(() => {
            this.refs.toastError.show(
              "Email actualizado, vuelve a iniciar sesión",
              200,
              () => {
                firebase.auth().signOut();
              }
            );
          })
          .catch(error => {
            //console.log(error);
            this.refs.toastError.show(error, 1500);
          });
      })
      .catch(err => {
        console.log(err);
        this.refs.toastError.show("Tu contraseña no es correcta", 1500);
      });
  };

  returnUpdateUserInfoComponent = userInfoData => {
    /**
     * Check if the user info has been loaded, if the userInfoData (this.state.userInfo)
     * has the property uid you can load the Component UpdateUserInfo passing the
     * userInfo retrieved from Firebase and the function updateUserDisplayName
     * for updating data in the OverlayOneInput Component
     *
     * @param {Object} userInfoData
     */
    if (userInfoData.hasOwnProperty("uid")) {
      return (
        <View>
          <UpdateUserInfo
            userInfo={this.state.userInfo}
            updateUserDisplayName={this.updateUserDisplayName}
            updateUserEmail={this.updateUserEmail}
          />
        </View>
      );
    }
  };

  render() {
    /**
     * Data from Firebase loaded in the state object by the constructor
     */
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
          <View>
            <Text style={styles.displayName}>{displayName}</Text>
            <Text>{email}</Text>
          </View>
        </View>
        {this.returnUpdateUserInfoComponent(this.state.userInfo)}
        <Button
          title="Cerrar Sesión"
          onPress={() => firebase.auth().signOut()}
          buttonStyle={styles.btnCloseSession}
          titleStyle={styles.btnCloseSessionText}
        />
        <Toast
          ref="toastError"
          position="bottom"
          positionValue={400}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
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
  },
  btnCloseSession: {},
  btnCloseSessionText: {}
});

export default UserInfo;
