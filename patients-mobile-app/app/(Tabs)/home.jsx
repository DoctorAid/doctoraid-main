// Tab.js
import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Animated 
} from "react-native";
import WelcomeMessage from "../Components/WelcomeMessage";
import DoctorCardType1 from "../Components/DoctorCardType1"; 
import DoctorCardType2 from "../Components/DoctorCardType2";
import OngoingCardType1 from "../Components/OngoingCardType1";
import Homebrowse from '../Assets/images/homebrowse.svg';
import DoctorCardType4 from "../Components/DoctorCardType4";

export default function Tab() {
  const [currentStep, setCurrentStep] = useState("step1"); // "step1" -> "step3"
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  const handlePinSubmit = () => {
    // Fade out current content
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      setCurrentStep("step3");
      // Fade in new content
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start();
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <WelcomeMessage />
        
        <Animated.View style={{ opacity: fadeAnim, marginBottom: 15 }}>
          {currentStep === "step1" && <DoctorCardType1 onPress={handlePinSubmit} />}
          {currentStep === "step3" && <OngoingCardType1 />}
        </Animated.View>

        <Text style={styles.sectionTitle}>Subscribed Doctors</Text>
        <DoctorCardType2 />
        <DoctorCardType4 />
        <View style={styles.svgContainer}>
          <Homebrowse width={350} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAF9F6",
  },
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  sectionTitle: {
    paddingHorizontal: 30,
    fontSize: 20,
    fontWeight: "bold",
    color: "#265A69",
    marginTop: 30,
    marginBottom: 10,
  },
  svgContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: -100,
  },
});