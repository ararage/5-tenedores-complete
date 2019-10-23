import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Overlay, Input, Button } from "react-native-elements";

class OverlayOneInput extends Component {
  constructor(props) {
    super(props);
    // Fill Props from Update User Info (isVisibleOverlay, placeholder, inputValue)
    this.state = {
      ...props
    };
  }

  /*
    Update the inputValue passed with onchange event
  */
  onChangeInput = inputData => {
    this.setState({ inputValue: inputData });
  };

  update = () => {
    const newValue = this.state.inputValue;
    this.state.updateFunction(newValue);
    // After updating new Value we must reset the isVisibleOverlay
    this.setState({ isVisibleOverlay: false });
  };

  render() {
    // Get Data from State (Update User Info) and fill the input Overlay
    const { isVisibleOverlay, placeholder, inputValue } = this.state;
    return (
      <Overlay
        isVisible={isVisibleOverlay}
        fullScreen={true}
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlayStyle}
      >
        <View style={styles.viewOverlay}>
          <Input
            containerStyle={styles.inputContainer}
            placeholder={placeholder}
            onChangeText={value => this.onChangeInput(value)}
            value={inputValue}
          />
          <Button
            buttonStyle={styles.buttonUpdate}
            title="Actualizar"
            onPress={() => this.update()}
          />
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  viewOverlay: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderColor: "#00a680",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  inputContainer: {
    marginBottom: 20
  },
  buttonUpdate: {
    backgroundColor: "#00a680"
  }
});

export default OverlayOneInput;
