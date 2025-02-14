import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { Calendar, Clock, ChevronRight } from "lucide-react-native";

const appointments = [
  {
    id: "1",
    doctor: "Dr. Lakee Jayamanne",
    patient: "Nimesha",
    date: "Sunday, 12 June",
    time: "11:00 am - 12:00 pm",
  },
];

const DoctorQueueCard = ({ item }) => {
  const [pin, setPin] = useState("");

  return (
    <View style={styles.card}>
      {/* Header with Doctor Name & Patient */}
      <View style={styles.header}>
        <View style={styles.imagePlaceholder} />
        <View style={styles.textContainer}>
          <Text style={styles.doctorName}>{item.doctor}</Text>
          <Text style={styles.forPatient}>
            For <Text style={styles.patientName}>{item.patient}</Text>
          </Text>
        </View>
        <ChevronRight size={24} color="white" />
      </View>

      {/* Appointment Date & Time */}
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Calendar size={16} color="#AFCDE7" />
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View style={styles.row}>
          <Clock size={16} color="#AFCDE7" />
          <Text style={styles.time}>{item.time}</Text>
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
      />

      {/* Enter Queue Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enter Queue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function DoctorQueueList() {
  return (
    <View style={styles.container}>
      {appointments.map((item) => (
        <DoctorQueueCard key={item.id} item={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E3A4E",
    padding: 20,
  },
  card: {
    backgroundColor: "#164A63",
    width: 340,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
