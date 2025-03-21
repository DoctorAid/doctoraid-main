import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

const OngoingCardType2 = () => {
  const appointmentNo = 7;
  const queueCount = 1;
  const doctorName = "Dr. Lakee Jayamanne";
  const patientName = "Nimesha";
  const appointmentTime = "11:00am - 12:00pm";
  const profilePic = "https://via.placeholder.com/50";
  const currentTagText = "Current"; 

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.header}>Ongoing</Text>
          <Text style={styles.header}>Appointment</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{appointmentTime}</Text>
        </View>
      </View>

      {/* Appointment Card */}
      <View style={styles.card}>
        {/* Doctor Info */}
        <View style={styles.doctorInfo}>
          <Image source={{ uri: profilePic }} style={styles.profilePic} />
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>{doctorName}</Text>
            <Text style={styles.patientName}>For {patientName}</Text>
          </View>
        </View>

        <View style={styles.fullWidthDivider} />

        {/* Status Section */}
        <View style={styles.ongoingContainer}>
          <Text style={styles.ongoingText}>Ongoing</Text>
          <View style={styles.currentTag}>
            <Text style={styles.currentText}>{currentTagText}</Text>
          </View>
        </View>

        {/* Queue Info with larger text */}
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
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingRight: 10,
  },
  headerTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: 120, 
    flexShrink: 1, 
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A5A72',
    textAlign: 'left',
  },
  timeContainer: {
    backgroundColor: '#0A5A72',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    marginLeft: 5,
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
    marginBottom: 15,
  },
  doctorDetails: {
    flex: 1,
    marginLeft: 10,
  },
  doctorName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  patientName: {
    color: '#C0E4E9',
    fontSize: 16,
    marginTop: 5,
  },
  fullWidthDivider: {
    height: 1,
    backgroundColor: '#C0E4E9',
    width: '100%',
    marginVertical: 15,
  },
  ongoingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  ongoingText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  currentTag: {
    backgroundColor: '#DBF3C9',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  currentText: {
    color: '#0A5A72',
    fontWeight: 'bold',
    fontSize: 16,
  },
  queueInfo: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
