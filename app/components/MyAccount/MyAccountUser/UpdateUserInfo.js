import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";

// Components
import OverlayOneInput from "../../Elements/OverlayOneInput";
import OverlayTwoInputs from "../../Elements/OverlayTwoInputs";
import OverlayThreeInputs from "../../Elements/OverlayThreeInputs";
// import Toast from "react-native-easy-toast";
import Toast from "react-native-tiny-toast";

class UpdateUserInfo extends Component {
  constructor(props) {
    /** 
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
             * Open the overlay Component with the data provided, Placeholder,
             * updateFunction and initial InputValue
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
            this.openOverlayTwoInputs(
              "Email",
              "Password",
              String(props.userInfo.email),
              this.updateUserEmail
            );
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
            this.openOverlayThreeInputs(
              "Contraseña Actual",
              "Nueva Contraseña",
              "Repetir Nueva Contraseña",
              this.updateUserPassword
            );
          }
        }
      ]
    };
  }

  updateUserDisplayName = async newDisplayName => {
    /**
     *  Exec the updateUserDisplayName intherited from the UserInfo component,
     *  at the end sets the overlayComponent attribute (from the state object) to null
     *  destroying the Overlay
     *
     *  @param {string} newDisplayName
     */
    if (newDisplayName) this.state.updateUserDisplayName(newDisplayName);
    this.setState({ overlayComponent: null });
  };

  updateUserEmail = async (newEmail, password) => {
    /**
     *  Exec the updateUserEmail intherited from the UserInfo component,
     *  at the end sets the overlayComponent attribute (from the state object) to null
     *  destroying the Overlay
     *
     *  @param {string} newEmail
     *  @param {string} password
     */
    const emailOld = this.props.userInfo.email;
    if (emailOld != newEmail) {
      this.state.updateUserEmail(newEmail, password);
    }
    this.setState({ overlayComponent: null });
  };

  openOverlay = (placeholder, updateFunction, inputValue) => {
    /**
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

  openOverlayTwoInputs = (
    placeholderOne,
    placeholderTwo,
    inputValueOne,
    updateFunction
  ) => {
    /**
     *
     * @param {string} placeholderOne
     * @param {string} placeholderTwo
     * @param {string} inputValueOne
     * @param {function} updateFunction
     */
    this.setState({
      overlayComponent: (
        <OverlayTwoInputs
          isVisibleOverlay={true}
          placeholderOne={placeholderOne}
          placeholderTwo={placeholderTwo}
          inputValueOne={inputValueOne}
          inputValueTwo=""
          isPassword={true}
          updateFunction={updateFunction}
        />
      )
    });
  };

  updateUserPassword = async (
    currentPassword,
    newPassword,
    repeatNewPassword
  ) => {
    if (currentPassword && newPassword && repeatNewPassword) {
      if (newPassword === repeatNewPassword) {
        if (currentPassword === newPassword) {
          Toast.show("La nueva contraseña no puede ser igual a la actual");
        } else {
          this.state.updateUserPassword(currentPassword, newPassword);
        }
      } else {
        Toast.show("Las nuevas contraseñas tienen que ser iguales");
      }
    } else {
      Toast.show("Tienes que llenar todos los campos");
    }
    this.setState({ overlayComponent: null });
  };

  openOverlayThreeInputs = (
    placeholderOne,
    placeholderTwo,
    placeholderThree,
    updateFunction
  ) => {
    this.setState({
      overlayComponent: (
        <OverlayThreeInputs
          isVisibleOverlay={true}
          placeholderOne={placeholderOne}
          placeholderTwo={placeholderTwo}
          placeholderThree={placeholderThree}
          inputValueOne=""
          inputValueTwo=""
          inputValueThree=""
          isPassword={true}
          updateFunction={updateFunction}
        />
      )
    });
  };

  render() {
    /**
     * Render the User Data and an individual Overlay Component for every User Field
     * for update actions
     */
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
