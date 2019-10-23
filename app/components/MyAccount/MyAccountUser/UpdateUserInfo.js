import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import OverlayOneInput from "../../Elements/OverlayOneInput";

class UpdateUserInfo extends Component {
  constructor(props) {
    /*
      Initializes the state object merging the inherited data from the 
      UserInfo component (userInfo, updateUserDisplayName)
      @param {Object} props   
    */
    super(props);
    this.state = {
      ...props,
      // This field manage the Overlay component for every input
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
            /*
              Open the overlay Component with the data provided, Placeholder, 
              updateFunction and initial InputValue
            */
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
    /*
      Exec the updateUserDisplayName intherited from the UserInfo component, 
      at the end sets the overlayComponent attribute (from the state object) to null
      hidding the Overlay

      @param {function} newDisplayName   
    */
    this.state.updateUserDisplayName(newDisplayName);
    this.setState({ overlayComponent: null });
  };

  openOverlay = (placeholder, updateFunction, inputValue) => {
    /*
      Call the Overlay Component for every individual field to update if
      the item it's invoked, the placeholder will be filled with the placeholder parameter
      received, the updateFunction in this case it's the updateUserDisplayName function
      that calls the updateUserDisplayName inherited from UserInfo component and the inputValue
      it's the value retrieved from the Service/Database (inherited from the UserInfo component).

      @param {string} placeholder
      @param {function} updateFunction   
      @param {string} inputValue
    */

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
