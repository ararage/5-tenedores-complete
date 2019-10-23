import React, { Component } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";

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
          contentContainerStyle={styles.viewBody}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <UserInfo />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default MyAccountUser;
