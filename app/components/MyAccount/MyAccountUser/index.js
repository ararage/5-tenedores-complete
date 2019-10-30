import React, { Component } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";

// Components
import UserInfo from "./UserInfo";

class MyAccountUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.viewUserAccount}>
            <UserInfo />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  viewUserAccount: {
    height: "100%",
    backgroundColor: "#f2f2f2"
  },
  container: {
    flex: 1
  }
});

export default MyAccountUser;
