// PinEntryCard.js (renamed from DoctorCardType3 for clarity)
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Calendar, Clock, ChevronRight } from "lucide-react-native";

const PinEntryCard = ({ onSubmitPin }) => {
  const [pin, setPin] = useState("");
  const appointment = {
    doctorName: "Dr. Lakee Jayamanne",
    patientName: "Nimesha",
    date: "Sunday, 12 June",
    time: "11:00 am - 12:00 pm",
  };
  
  const handleSubmitPin = () => {
    if (pin.trim().length > 0) {
      console.log("PIN submitted:", pin);
      onSubmitPin();
    } else {
      console.log("Please enter a valid PIN");
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Enter the pin number</Text>
      <View style={styles.card}>
        {/* Header with Doctor Name & Patient */}
        <View style={styles.header}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.textContainer}>
            <Text style={styles.doctorName}>{appointment.doctorName}</Text>
            <Text style={styles.forPatient}>
              For <Text style={styles.patientName}>{appointment.patientName}</Text>
            </Text>
          </View>
          <ChevronRight size={24} color="white" />
        </View>
       
        {/* Appointment Date & Time */}
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Calendar size={16} color="#AFCDE7" />
            <Text style={styles.date}>{appointment.date}</Text>
          </View>
          <View style={styles.row}>
            <Clock size={16} color="#AFCDE7" />
            <Text style={styles.time}>{appointment.time}</Text>
          </View>
        </View>
       
        {/* PIN Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Enter Pin |"
          placeholderTextColor="#AFCDE7"
          secureTextEntry
          value={pin}
          onChangeText={setPin}
          keyboardType="number-pad"
        />
       
        {/* Enter Queue Button */}
        <TouchableOpacity style={styles.button} onPress={handleSubmitPin}>
          <Text style={styles.buttonText}>Enter Queue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#265A69',
    marginBottom: 10,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#265A69",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#AFCDE7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#AFCDE7",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  forPatient: {
    fontSize: 14,
    color: "#AFCDE7",
  },
  patientName: {
    fontWeight: "bold",
    color: "#AFCDE7",
  },
  infoContainer: {
    borderTopWidth: 1,
    borderColor: "#AFCDE7",
    paddingTop: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#AFCDE7",
    marginLeft: 5,
  },
  time: {
    fontSize: 14,
    color: "#AFCDE7",
    marginLeft: 5,
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#AFCDE7",
    padding: 10,
    borderRadius: 10,
    color: "white",
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#AFCDE7",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#164A63",
    fontWeight: "bold",
  },
});

export default PinEntryCard;