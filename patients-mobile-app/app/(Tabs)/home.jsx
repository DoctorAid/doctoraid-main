import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import WelcomeMessage from "../Components/WelcomeMessage";
import SearchBar from "../Components/SearchBar";
import DoctorCardType1 from "../Components/DoctorCardType1"; 
import DoctorCardType2 from "../Components/DoctorCardType2";
import DoctorCardType3 from "../Components/DoctorCardType3";
import OngoingCardType1 from "../Components/OngoingCardType1";

export default function Tab() {
  const [currentStep, setCurrentStep] = useState("step1"); // "step1" -> "step2" -> "step3"
  const handleCardClick = () => setCurrentStep("step2");
  const handlePinSubmit = () => setCurrentStep("step3");

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <WelcomeMessage />
      <SearchBar />
      {currentStep === "step1" && <DoctorCardType1 onPress={handleCardClick} />}
      {currentStep === "step2" && <DoctorCardType3 onSubmitPin={handlePinSubmit} />}
      {currentStep === "step3" && <OngoingCardType1 />}

      <Text style={styles.sectionTitle}>Subscribed Doctors</Text>
      <DoctorCardType2/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#FAF9F6",
  },
  sectionTitle: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#265A69",
    marginTop: 30,
    marginBottom: 10,
  },
});
