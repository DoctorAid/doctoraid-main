import { StyleSheet, Text, View, Image } from 'react-native'; 
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const OngoingCardType1 = () => {
  const appointmentNo = 7;
  const currentNo = 5;
  const queueCount = 1;
  const doctorName = "Dr. Ruchitha Perera";
  const patientName = "Namal Dahanayake";
  const appointmentTime = "11:00 AM - 12:00 PM";
  const notificationMessage = "No: 6 haven't joined the queue";
  const upNextText = "Up Next"; 
  const doctorImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxNMPc0tFsIwbXWYrR_6VR9Whnt3O9ut-8fQ&s";

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View>
        <Text style={styles.titleText}>Ongoing</Text>
        <Text style={styles.titleText}>Appointment</Text>
      </View>
      
      {/* Appointment Card */}
      <View style={styles.card}>
        {/* Doctor Info */}
        <View style={styles.header}>  
          <Image 
            source={{ uri: doctorImageUrl }}
            style={styles.doctorImage}
          />
          <View style={styles.textContainer}>
            <Text style={styles.doctorName}>{doctorName}</Text>
            <Text style={styles.forPatient}>
              For <Text style={styles.patientName}>{patientName}</Text>
            </Text>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{appointmentTime}</Text>
          </View>
        </View>

        {/* Divider Line */}
        <View style={styles.divider} />

        {/* Appointment Number */}
        <Text style={styles.number}>No: {appointmentNo.toString().padStart(2, '0')}</Text>

        {/* Queue Info & Up Next Button in a Row */}
        <View style={styles.queueRow}>
          <View>
            <Text style={styles.whiteText}>Current No: {currentNo.toString().padStart(2, '0')}</Text>
            <Text style={styles.whiteText}>Queue Count: {queueCount.toString().padStart(2, '0')}</Text>
          </View>
          <View style={styles.upNextContainer}>
            <Text style={styles.upNextText}>{upNextText}</Text> 
          </View>
        </View>

        {/* Notification Message */}
        <View style={styles.queueInfo}>
          <MaterialIcons name="notifications" size={16} color="#265A69" />
          <Text style={styles.queueText}>{notificationMessage}</Text>
        </View>
      </View>
    </View>
  );
};

export default OngoingCardType1;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  titleText: {
    paddingHorizontal: 10,
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#265A69',
  },
  card: {
    backgroundColor: '#265A69', 
    padding: 20, 
    borderRadius: 15, 
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#AFCDE7",
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doctorImage: {
    width: 50, 
    height: 50, 
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  doctorName: {
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold'
  },
  forPatient: {
    color: '#AFCDE7', 
    fontSize: 14
  },
  patientName: {
    fontWeight: 'bold',
    color: '#AFCDE7',
  },
  timeContainer: {
    marginRight: 20,
    backgroundColor: '#AFCDE7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  timeText: {
    color: '#265A69',
    fontSize: 12,
    fontWeight: 'bold',
  },
  divider: {
    borderBottomWidth: 1, 
    borderBottomColor: '#AFCDE7', 
    marginVertical: 10
  },
  number: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  queueRow: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  whiteText: {
    color: 'white',
    fontSize: 14,
    marginVertical: 2,
  },
  upNextContainer: {
    backgroundColor: '#DBF3C9',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  upNextText: {
    color: '#265A69',
    fontSize: 14,
    fontWeight: 'bold',
  },
  queueInfo: {
    backgroundColor: '#AFCDE7',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  queueText: {
    color: '#265A69',
    fontSize: 14,
    marginLeft: 5,
  },
});