import React from "react";
import { View, Text, StyleSheet } from "react-native";

const users = [
  { id: "1", name: "Subasinghe Family" },
  { id: "2", name: "Fernando Family" },
  { id: "3", name: "Perera Family" },
];

const loggedInUserId = "1"; // Change this ID dynamically based on authentication

const WelcomeMessage = () => {
  const user = users.find((u) => u.id === loggedInUserId);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.familyName}>{user ? user.name + "!" : "Guest!"}</Text>
    </View>
  );
};

export default WelcomeMessage;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 0,
    backgroundColor: "#FAF9F6",
  },
  welcome: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#265A69",
  },
  familyName: {
    fontSize: 24,
    color: "#4A6D7C",
  },
});
