import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecordCard = ({ record }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.patientName}>{record.patientName}</Text>
      <Text style={styles.doctorName}>{record.doctorName}</Text>
      <Text style={styles.info}>
        <Text style={styles.icon}>🕒</Text> {record.time}{"\n"}
        <Text style={styles.icon}>📅</Text> {record.date}
      </Text>
      <Text style={styles.label}>Presenting Complaint</Text>
      <Text style={styles.content}>{record.presentingComplaint}</Text>
      <Text style={styles.label}>Diagnosis</Text>
      <Text style={styles.content}>{record.diagnosis}</Text>
      <Text style={styles.label}>Instructions</Text>
      <Text style={styles.content}>{record.instructions}</Text>
      
      <View style={styles.prescriptionBox}>
        <Text style={styles.label}>Prescription</Text>
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
});

export default RecordCard;
