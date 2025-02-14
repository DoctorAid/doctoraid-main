import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import WelcomeMessage from "../Components/WelcomeMessage";
import SearchBar from "../Components/SearchBar";
import DoctorCardType1 from "../Components/DoctorCardType1"; // Appointments
import DoctorCardList from "../Components/DoctorCardType2"; // Subscribed Doctors

export default function Tab() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Welcome Message */}
      <WelcomeMessage />

      {/* Search Bar */}
      <SearchBar />

      {/* Your Appointments Section */}
      <Text style={styles.sectionTitle}>Your Appointments</Text>
      <DoctorCardType1 />

      {/* Subscribed Doctors Section */}
      <Text style={styles.sectionTitle}>Subscribed Doctors</Text>
      <DoctorCardList />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 60,
    backgroundColor: "#FAF9F6",
  },
  sectionTitle: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#1D1E2C",
    marginTop: 30,
    marginBottom: 10,
  },
});
