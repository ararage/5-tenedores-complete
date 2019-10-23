import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import OverlayOneInput from "../../Elements/OverlayOneInput";

class UpdateUserInfo extends Component {
  constructor(props) {
    super(props);
    // Get data inherited { menuItems, overlayComponent }
    this.state = {
      ...props,
      overlayComponent: null,
      menuItems: [
        {
          title: "Cambiar Nombre y Apellidos",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconNameLeft: "account-circle",
          iconColorRight: "#ccc",
          iconColorLeft: "#ccc",
          onPress: () => {
            this.openOverlay(
              "Nombre y Apellidos",
              this.updateUserDisplayName,
              props.userInfo.displayName
            );
          }
        },
        {
          title: "Cambiar Email",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconNameLeft: "at",
          iconColorRight: "#ccc",
          iconColorLeft: "#ccc",
          onPress: () => {
            console.log("Click en email");
          }
        },
        {
          title: "Cambiar Contraseña",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconNameLeft: "lock-reset",
          iconColorRight: "#ccc",
          iconColorLeft: "#ccc",
          onPress: () => {
            console.log("Click en cambiar pass");
          }
        }
      ]
    };
  }

  updateUserDisplayName = async newDisplayName => {
    // Exec the function "updateUserDisplayName" inherited from UserInfo
    this.state.updateUserDisplayName(newDisplayName);
    this.setState({ overlayComponent: null });
  };

  openOverlay = (placeholder, updateFunction, inputValue) => {
    this.setState({
      overlayComponent: (
        <OverlayOneInput
          isVisibleOverlay={true}
          placeholder={placeholder}
          updateFunction={updateFunction}
          inputValue={inputValue}
        />
      )
    });
  };

  render() {
    const { menuItems, overlayComponent } = this.state;
    return (
      <View>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            leftIcon={{
              type: item.iconType,
              name: item.iconNameLeft,
              color: item.iconColorLeft
            }}
            rightIcon={{
              type: item.iconType,
              name: item.iconNameRight,
              color: item.iconColorRight
            }}
            onPress={item.onPress}
            containerStyle={styles.contentContainerStyle}
          />
        ))}
        {overlayComponent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3d3"
  }
});

export default UpdateUserInfo;
