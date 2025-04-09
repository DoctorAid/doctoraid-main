import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  Animated,
  TouchableOpacity,
  Alert
} from "react-native";
import WelcomeMessage from "../Components/WelcomeMessage";
import DoctorCardType1 from "../Components/DoctorCardType1"; 
import DoctorCardType2 from "../Components/DoctorCardType2";
import DoctorCardType4 from "../Components/DoctorCardType4"; // You'll need to create this component
import OngoingCardType1 from "../Components/OngoingCardType1";
import Homebrowse from '../Assets/images/homebrowse.svg';

export default function Tab() {
  const [currentStep, setCurrentStep] = useState("step1"); // "step1" -> "step3"
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  // Mock data for subscribed doctors - just one doctor to avoid repetition
  const subscribedDoctors = [
    {
      _id: "1",
      name: "Dr. Chanugi",
      location: "Kandy",
      weekdayHours: "8:00pm - 10:00pm",
      weekendHours: "8:00pm - 10:00pm",
      imageUrl: require("../Assets/images/doctor.jpg"),
    },
  ];

  // Mock data for nearby doctors
  const nearbyDoctors = [
    {
      _id: "4",
      name: "Dr. Sandith Rajapakshe",
      location: "Kandy",
      specialty: "Cardiology",
      distance: "2.5 km",
      rating: 4.8,
      imageUrl: require("../Assets/images/doctor.jpg"),
    },

  ];

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

  // Function to handle doctor subscription
  const handleSubscribeDoctor = (doctorId) => {
    Alert.alert("Success", `Successfully subscribed to doctor with ID: ${doctorId}`);
  };

  // Check if a doctor is already subscribed
  const isSubscribed = (doctorId) => {
    return subscribedDoctors.some(doctor => doctor._id === doctorId);
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
        {/* Using just one DoctorCardType2 to avoid potential duplication issues */}
        {subscribedDoctors.length > 0 ? (
          <DoctorCardType2 
            doctor={subscribedDoctors[0]}
          />
        ) : (
          <Text style={styles.noDataText}>No subscribed doctors found</Text>
        )}
        
        {/* Using just one DoctorCardType4 to avoid potential duplication issues */}
        {nearbyDoctors.length > 0 ? (
          <View style={styles.doctorContainer}>
            <DoctorCardType4 doctor={nearbyDoctors[0]} />
            
          </View>
        ) : (
          <Text style={styles.noDataText}>No nearby doctors found</Text>
        )}
        
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
    fontFamily: "Raleway",
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
  loadingText: {
    paddingHorizontal: 30,
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
  noDataText: {
    paddingHorizontal: 30,
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
  doctorContainer: {
    position: 'relative',
  },
  subscribeButton: {
    position: 'absolute',
    right: 40,
    bottom: 20,
    backgroundColor: '#265A69',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  subscribeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  }
});