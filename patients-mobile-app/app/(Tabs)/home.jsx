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
import OngoingCardType1 from "../Components/OngoingCardType1";
import Homebrowse from '../Assets/images/homebrowse.svg';
import { 
  getNearbyDoctors, 
  subscribeDoctor, 
  getSubscribedDoctors 
} from "../API/mobileapi"; 

export default function Tab() {
  const [currentStep, setCurrentStep] = useState("step1"); // "step1" -> "step3"
  const [nearbyDoctors, setNearbyDoctors] = useState([]);
  const [subscribedDoctors, setSubscribedDoctors] = useState([]);
  const [loading, setLoading] = useState({
    nearby: false,
    subscribed: false
  });
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  const patientId = '123';
  const familyId = '456';

  const fetchNearbyDoctors = async () => {
    try {
      setLoading(prev => ({ ...prev, nearby: true }));
      const doctors = await getNearbyDoctors(patientId);
      setNearbyDoctors(doctors);
    } catch (error) {
      console.error("Error fetching nearby doctors:", error);
      Alert.alert("Error", "Failed to fetch nearby doctors");
    } finally {
      setLoading(prev => ({ ...prev, nearby: false }));
    }
  };

  // Function to fetch subscribed doctors
  const fetchSubscribedDoctors = async () => {
    try {
      setLoading(prev => ({ ...prev, subscribed: true }));
      const doctors = await getSubscribedDoctors(familyId);
      setSubscribedDoctors(doctors);
    } catch (error) {
      console.error("Error fetching subscribed doctors:", error);
      Alert.alert("Error", "Failed to fetch subscribed doctors");
    } finally {
      setLoading(prev => ({ ...prev, subscribed: false }));
    }
  };

  // Function to handle doctor subscription
  const handleSubscribeDoctor = async (doctorId) => {
    try {
      const subscriptionData = {
        doctorId,
        familyId,
        // Add any other required data for subscription
      };
      
      // Show loading indicator or disable button (would be handled in the UI)
      const response = await subscribeDoctor(subscriptionData);
      
      // If successful, refresh the subscribed doctors list
      if (response.success) {
        Alert.alert("Success", "Successfully subscribed to doctor");
        fetchSubscribedDoctors();
      } else {
        Alert.alert("Error", response.message || "Failed to subscribe to doctor");
      }
    } catch (error) {
      console.error("Error subscribing to doctor:", error);
      Alert.alert("Error", "Failed to subscribe to doctor");
    }
  };

  // Check if a doctor is already subscribed
  const isSubscribed = (doctorId) => {
    return subscribedDoctors.some(doctor => doctor._id === doctorId);
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchNearbyDoctors();
    fetchSubscribedDoctors();
  }, []);

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
        
        <Animated.View style={{ opacity: fadeAnim }}>
          {currentStep === "step1" && <DoctorCardType1 onPress={handlePinSubmit} />}
          {currentStep === "step3" && <OngoingCardType1 />}
        </Animated.View>

        <Text style={styles.sectionTitle}>Subscribed Doctors</Text>
        {loading.subscribed ? (
          <Text style={styles.loadingText}>Loading subscribed doctors...</Text>
        ) : (
          subscribedDoctors.length > 0 ? (
            subscribedDoctors.map((doctor) => (
              <DoctorCardType2 
                key={doctor._id} 
                doctor={doctor}
              />
            ))
          ) : (
            <Text style={styles.noDataText}>No subscribed doctors found</Text>
          )
        )}
        
        <Text style={styles.sectionTitle}>Nearby Doctors</Text>
        {loading.nearby ? (
          <Text style={styles.loadingText}>Loading nearby doctors...</Text>
        ) : (
          nearbyDoctors.length > 0 ? (
            nearbyDoctors.map((doctor) => (
              <View key={doctor._id} style={styles.doctorContainer}>
                <DoctorCardType2 doctor={doctor} />
                {!isSubscribed(doctor._id) && (
                  <TouchableOpacity 
                    style={styles.subscribeButton}
                    onPress={() => handleSubscribeDoctor(doctor._id)}
                  >
                    <Text style={styles.subscribeText}>Subscribe</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No nearby doctors found</Text>
          )
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