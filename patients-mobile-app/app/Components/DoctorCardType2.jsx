import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Sample data for multiple doctors
const doctorProfiles = [
  {
    id: "1",
    name: "Dr. Ruchitha Perera",
    location: "Matara",
    weekdayHours: "8:00pm - 10:00pm",
    weekendHours: "8:00pm - 10:00pm",
    subscribed: false,
  },
  {
    id: "2",
    name: "Dr. Ganga Tennakoon",
    location: "Colombo",
    weekdayHours: "9:00am - 11:00am",
    weekendHours: "10:00am - 12:00pm",
    subscribed: true,
  },
  {
    id: "3",
    name: "Dr. Jayashan Madushan",
    location: "Galle",
    weekdayHours: "4:00pm - 6:00pm",
    weekendHours: "3:00pm - 5:00pm",
    subscribed: false,
  },
];

const DoctorCard = ({ doctor }) => {
  const navigation = useNavigation();
  // Using a constant image URL for all doctors
  const doctorImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxNMPc0tFsIwbXWYrR_6VR9Whnt3O9ut-8fQ&s";
  
  const handleViewAppointments = () => {
    // Navigate to AppointmentScreen component with doctor data
    navigation.navigate('./DoctorAppointment', { 
      doctor: doctor,
      onBack: () => navigation.goBack()
    });
  };
  
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: doctorImageUrl }}
            style={styles.doctorImage}
            resizeMode="cover"
          />
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.location}>{doctor.location}</Text>
          
          <View style={styles.scheduleContainer}>
            <Text style={styles.scheduleTitle}>Weekdays</Text>
            <Text style={styles.scheduleTime}>{doctor.weekdayHours}</Text>
            
            <Text style={[styles.scheduleTitle, styles.weekendTitle]}>Weekends</Text>
            <Text style={styles.scheduleTime}>{doctor.weekendHours}</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.appointmentButton}
        onPress={handleViewAppointments}
      >
        <Text style={styles.buttonText}>View Appointments</Text>
      </TouchableOpacity>
    </View>
  );
};

const DoctorProfileList = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={doctorProfiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DoctorCard doctor={item} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        snapToAlignment="center"
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default DoctorProfileList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 20,
    width: 320,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    marginBottom: 15,
  },
  imageContainer: {
    marginRight: 20,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F0F0F0",
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  doctorName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A2E35",
    marginBottom: 4,
  },
  location: {
    fontSize: 16,
    color: "#8F9BB3",
    marginBottom: 10,
  },
  scheduleContainer: {
    marginTop: 5,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A2E35",
  },
  weekendTitle: {
    marginTop: 8,
  },
  scheduleTime: {
    fontSize: 14,
    color: "#8F9BB3",
    marginBottom: 4,
  },
  appointmentButton: {
    backgroundColor: "#E6F1FA",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#6B96B9",
    fontSize: 16,
    fontWeight: "600",
  },
});