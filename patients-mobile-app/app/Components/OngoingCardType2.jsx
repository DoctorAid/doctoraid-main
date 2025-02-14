import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const OngoingCardType2 = () => {
  const appointmentNo = 7;
  const queueCount = 1;

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Ongoing Appointment</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>11:00am - 12:00pm</Text>
        </View>
      </View>

      {/* Appointment Card */}
      <View style={styles.card}>
        {/* Doctor Info */}
        <View style={styles.doctorInfo}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.profilePic} />
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>Dr. Lakee Jayamanne</Text>
            <Text style={styles.patientName}>For <Text style={styles.boldText}>Nimesha</Text></Text>
          </View>
        </View>

        {/* Full-width Divider */}
        <View style={styles.fullWidthDivider} />

        {/* Ongoing Status */}
        <View style={styles.ongoingContainer}>
          <Text style={styles.ongoingText}>Ongoing</Text>
          <View style={styles.currentTag}>
            <Text style={styles.currentText}>Current</Text>
          </View>
        </View>

        {/* Queue Information */}
        <Text style={styles.queueInfo}>Current No: {appointmentNo.toString().padStart(2, '0')}</Text>
        <Text style={styles.queueInfo}>Queue Count: {queueCount.toString().padStart(2, '0')}</Text>
      </View>
    </View>
  );
};

export default OngoingCardType2;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A5A72',
  },
  timeContainer: {
    backgroundColor: '#0A5A72',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#0A5A72',
    padding: 20,
    borderRadius: 15,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  doctorDetails: {
    flex: 1,
    marginLeft: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  doctorName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  patientName: {
    color: '#C0E4E9',
    fontSize: 14,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#C0E4E9',
  },
  fullWidthDivider: {
    height: 1,
    backgroundColor: '#C0E4E9',
    width: '100%', 
    marginVertical: 10,
  },
  ongoingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ongoingText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  currentTag: {
    backgroundColor: '#DBF3C9',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginLeft: 'auto',
  },
  currentText: {
    color: '#0A5A72',
    fontWeight: 'bold',
    fontSize: 14,
  },
  queueInfo: {
    color: 'white',
    fontSize: 14,
  },
});
