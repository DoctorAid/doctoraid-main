import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'; 
import React from 'react';

const LastAppointmentCard = () => {
  const doctorName = "Dr. Lakee Jayamanne";
  const patientName = "Nimesha";
  const appointmentTime = "11:00am - 12:00pm";
  const profilePic = "https://via.placeholder.com/50";
  const appointmentStatus = "Done"; 
  const showViewReport = true; 

  const handleViewReport = () => {
    console.log("View Report Clicked!");
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.header}>Last</Text>
          <Text style={[styles.header, { width: 150 }]}>Appointment</Text>
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
            <Text style={styles.patientName}>For <Text style={styles.boldText}>{patientName}</Text></Text>
          </View>
        </View>

        {/* Horizontal Line */}
        <View style={styles.line} />

        {/* Status & View Report */}
        <View style={styles.statusContainer}>
          <Text style={styles.status}>{appointmentStatus}</Text>
          {showViewReport && (
            <TouchableOpacity style={styles.viewReportButton} onPress={handleViewReport}>
              <Text style={styles.viewReportText}>View Report</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default LastAppointmentCard;

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
    flex: 0.6,
    marginRight: 20,
    flexDirection: 'column',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0A5A72',
    lineHeight: 26,
  },
  timeContainer: {
    backgroundColor: '#0A5A72',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 5,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#0A5A72',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A9D6E5',
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  doctorDetails: {
    flex: 1,
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
  line: {
    height: 1,
    backgroundColor: '#C0E4E9',
    marginVertical: 5,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  status: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 20,
  },
  viewReportButton: {
    backgroundColor: '#DBF3C9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  viewReportText: {
    color: '#0A5A72',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
