import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock, Calendar } from "lucide-react-native"; // Lucide Icons


export const records = [
  {
    patientName: "For Nimesha",
    doctorName: "Dr. David",
    time: "12:00 PM",
    date: "Sunday, 12 June",
    presentingComplaint: "Coughing\nFever",
    diagnosis: "Dengue",
    instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
    prescription: "Lorem ipsum dolor sit 1 day amet.\nLorem ipsum dolor sit 2 times adipiscing elit.\nLorem ipsum dolor sit 10 times sit amet."
  },
  {
    patientName: "For Nimesha",
    doctorName: "Dr. David",
    time: "12:00 PM",
    date: "Sunday, 12 June",
    presentingComplaint: "Coughing\nFever",
    diagnosis: "Dengue",
    instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
    prescription: "Lorem ipsum dolor sit 1 day amet.\nLorem ipsum dolor sit 2 times adipiscing elit.\nLorem ipsum dolor sit 10 times sit amet."
  },
  // Add more records as needed
];

const RecordCard = ({ record }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.patientName}>{record.patientName}</Text>
      <Text style={styles.doctorName}>{record.doctorName}</Text>
      <Text style={styles.info}>

      <View style={styles.timeSection}>
      <View style={styles.timeItem}>
        <Clock size={16} color="#6B7280" />
        <Text style={styles.timeText}>{record.time}</Text>
      </View>
      <View style={styles.timeItem}>
        <Calendar size={16} color="#6B7280" />
        <Text style={styles.timeText}>{record.date}</Text>
      </View>
    </View>
      </Text>
      <Text style={styles.label}>Presenting Complaint</Text>
      <Text style={styles.content}>{record.presentingComplaint}</Text>
      <Text style={styles.label}>Diagnosis</Text>
      <Text style={styles.content}>{record.diagnosis}</Text>
      <Text style={styles.label}>Instructions</Text>
      <Text style={styles.content}>{record.instructions}</Text>
      
      <View style={styles.prescriptionBox}>
        <Text style={styles.labelPre}>Prescription</Text>
        <Text style={styles.prescription}>{record.prescription}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
  },
  patientName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2B3A4A",
  },
  doctorName: {
    fontSize: 16,
    color: "#6C757D",
  },
  info: {
    marginTop: 10,
    color: "#6C757D",
  },
  icon: {
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2B3A4A",
    marginTop: 15,
  },
  labelPre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2B3A4A",
  },
  content: {
    fontSize: 14,
    color: "#6C757D",
    marginTop: 5,
  },
  prescriptionBox: {
    backgroundColor: "#E8F4FA",
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
  },
  prescription: {
    fontSize: 14,
    color: "#2B3A4A",
  },
  timeSection: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    color: '#6B7280',
    fontSize: 14,
  },
});

export default RecordCard;
