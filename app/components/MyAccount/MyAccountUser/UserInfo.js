import React, { Component } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { Avatar } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

import * as firebase from "firebase";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

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
    /**
     * As the name says, re-authenticate the current user with Firebase
     * using their current Email and Password, this because the user can change
     * their password
     */
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
            this.refs.toastError.show(error, 1500);
          });
      })
      .catch(err => {
        this.refs.toastError.show("Tu contraseña no es correcta", 1500);
      });
  };

  updateUserPassword = async (currentPassword, newPassword) => {};

  updateUserPhotoURL = async photoUri => {
    /**
     * Update the current FireBase User photoURL with the photoUri uploaded
     * to FireBase Storage
     */
    const update = {
      photoURL: photoUri
    };
    await firebase.auth().currentUser.updateProfile(update);
    this.getUserInfo();
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
            updateUserPassword={this.updateUserPassword}
          />
        </View>
      );
    }
  };

  changeAvatarUser = async () => {
    /**
     * Update the User Profile asking for Permissions (CAMERA_ROLL),
     * If the user accepts the permissions the image selected will be loaded
     * to FireBase Storage using the function uploadImage, for the name of the
     * image to uplad the app will use the current user uid from FireBase Auth
     */
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status == "denied") {
      this.refs.toastError.show(
        "Es necesario aceptar los permisos de la galería",
        1500
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (result.cancelled) {
      this.refs.toastError.show("Haz cerrado la galería de imágenes", 3000);
      return;
    }
    const { uid } = this.state.userInfo;
    this.uploadImage(result.uri, uid)
      .then(resolve => {
        this.refs.toastError.show("Avatar Actualizado Correctamente");
        firebase
          .storage()
          .ref(`avatar/${uid}`)
          .getDownloadURL()
          .then(resolve => {
            this.updateUserPhotoURL(resolve);
          })
          .catch(error => {
            this.refs.toastError.show(
              "Error al recuperar el avatar, intentelo más tarde"
            );
          });
      })
      .catch(error => {
        this.refs.toastError.show(
          "Error al actualizar el avatar, intentelo más tarde"
        );
      });
  };

  uploadImage = async (uri, nameImage) => {
    /**
     * Upload an image to FireBase Storage using the uri (Image Location)
     * and the User UID as Image Name, before calling the FireBase Client
     * the function use the old XMLHttpRequest, this will return a Promise
     * for resolving the succesfull upload
     *
     * @param {string} uri
     * @param {string} nameImage
     */
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      };
      xhr.open("GET", uri);
      xhr.responseType = "blob";
      xhr.send();
    })
      .then(async resolve => {
        let ref = firebase
          .storage()
          .ref()
          .child(`avatar/${nameImage}`);
        return await ref.put(resolve);
      })
      .catch(error => {
        this.refs.toastError.show(
          "Error al subir imagen, intentelo más tarde",
          1500
        );
      });
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
            showEditButton
            onEditPress={() => this.changeAvatarUser()}
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
