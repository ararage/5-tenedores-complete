import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Image } from "react-native-elements";

import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import Toast from "react-native-tiny-toast";

import t from "tcomb-form-native";
const Form = t.form.Form;
import {
  AddRestaurantStruct,
  AddRestaurantOptions
} from "../../forms/AddRestaurant";

class AddRestaurant extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        name: "",
        city: "",
        address: "",
        description: ""
      }
    };
  }

  render() {
    return (
      <View style={styles.viewBody}>
        <View style={styles.viewPhoto}>
          <Image source={{ uri: null }} style={{ width: 500, height: 200 }} />
        </View>
        <View>
          <Form
            ref="addRestaurantForm"
            type={AddRestaurantStruct}
            options={AddRestaurantOptions}
            value={this.state.formDate}
            onChange={() => {}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  }
});

export default AddRestaurant;
