import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';

const OngoingCardType1 = () => {
  const appointmentNo = 7;
  const currentNo = 5;
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
          <View>
            <Text style={styles.doctorName}>Dr. Lakee Jayamanne</Text>
            <Text style={styles.patientName}>For Nimesha</Text>
          </View>
        </View>

        {/* Divider Line */}
        <View style={styles.line} />

        {/* Appointment Number */}
        <Text style={styles.number}>No: {appointmentNo.toString().padStart(2, '0')}</Text>

        {/* Queue Info & Up Next Button in a Row */}
        <View style={styles.queueRow}>
          <View>
            <Text style={styles.whiteText}>Current No: {currentNo.toString().padStart(2, '0')}</Text>
            <Text style={styles.whiteText}>Queue Count: {queueCount.toString().padStart(2, '0')}</Text>
          </View>
          <View style={styles.upNextContainer}>
            <Text style={styles.upNextText}>Up Next</Text>
          </View>
        </View>

        {/* Notification Message */}
        <View style={styles.queueInfo}>
          <MaterialIcons name="notifications" size={16} color="#295567" />
          <Text style={styles.queueText}> No: 6 haven't joined the queue</Text>
        </View>
      </View>
    </View>
  )
}

export default OngoingCardType1

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#295567',
  },
  timeContainer: {
    backgroundColor: '#295567',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  timeText: {
    color: '#FEFAF6',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#0A5A72',
    padding: 15,
    borderRadius: 10,
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
  doctorName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  patientName: {
    color: '#C0E4E9',
    fontWeight: 'bold',
    fontSize: 14,
  },
  line: {
    height: 1,
    backgroundColor: '#C0E4E9',
    marginVertical: 5,
    width: '100%',
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
    marginBottom: 10,
  },
  whiteText: {
    color: 'white',
    fontSize: 14,
  },
  upNextContainer: {
    backgroundColor: '#DBF3C9',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  upNextText: {
    color: '#295567',
    fontSize: 14,
    fontWeight: 'bold',
  },
  queueInfo: {
    backgroundColor: '#C9E4F3',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  queueText: {
    color: '#295567',
    fontSize: 14,
  },
})
