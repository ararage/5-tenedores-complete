import "./src/fixtimerbug"; // <<<<<<<<<<<<<<<<<<
import React from "react";
import { StyleSheet, View } from "react-native";

// Tabs Navigation
import UserNavigation from "./app/navigations/User";

// Firebase
import fireBaseConfig from "./app/utils/FireBase";
import * as firebase from "firebase";

firebase.initializeApp(fireBaseConfig);

export default function App() {
  return (
    <View style={styles.container}>
      <UserNavigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
