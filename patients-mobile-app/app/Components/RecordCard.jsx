import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock, Calendar } from "lucide-react-native"; // Lucide Icons


export const records = [
  {
    patientName: "Namal Dahanayaka",
    doctorName: "Dr. Ruchitha Perera",
    time: "12:00 PM",
    date: "24.02.2025",
    presentingComplaint: "Coughing\nFever",
    diagnosis: "Dengue",
    instructions: "Get plenty of rest and drink fluids like water, king coconut water, and fruit juices to stay hydrated. Take Paracetamol 500mg every 6 hours for fever and body aches, but avoid ibuprofen or aspirin. Eat light meals like porridge and soups, and avoid oily or spicy foods. Watch for warning signs like severe abdominal pain, vomiting, or bleeding, and seek medical help if they occur.",
    prescription: "Paracetamol 500mg.\nPanadol"
  },
  {
    patientName: "For Namal Dahanayaka",
    doctorName: "Dr. Ruchitha Perera",
    time: "9:00 PM",
    date: "20.01.2025",
    presentingComplaint: "Headache",
    diagnosis: "Viral Flu",
    instructions: "Take plenty of rest and stay hydrated by drinking warm fluids like water, soups, and herbal tea. Take Paracetamol 500mg every 6 hours if you have fever or body pain. Eat light, nutritious meals and avoid cold, oily, and processed foods. If you have a runny nose, take Cetirizine 10mg at night. Monitor your symptoms, avoid close contact with others, and seek medical help if your condition worsens or persists beyond five days",
    prescription: "Vitamin C supplements\nParacetamol"
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
