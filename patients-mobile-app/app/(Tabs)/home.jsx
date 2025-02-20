import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateSelector from '../Components/DoctorAppoinmentDate';
import TimeSelector from '../Components/DoctorAppointmentTime';

export default function AppointmentScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity>
              <Ionicons name="chevron-back" size={24} color="#334155" />
            </TouchableOpacity>
          </View>

          <View style={styles.doctorInfo}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60' }}
              style={styles.doctorImage}
            />
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorName}>Dr. Lakee Jayamanne</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="call" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="chatbubble-ellipses" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </Text>
          </View>

          <View style={styles.timings}>
            <View style={styles.timingBlock}>
              <Text style={styles.timingTitle}>Weekdays</Text>
              <Text style={styles.timingHours}>4:00pm - 8pm</Text>
            </View>
            <View style={styles.timingBlock}>
              <Text style={styles.timingTitle}>Weekends</Text>
              <Text style={styles.timingHours}>9:00am - 12pm</Text>
              <Text style={styles.timingHours}>& 4pm-8pm</Text>
            </View>
          </View>

          <View style={styles.sessions}>
            <Text style={styles.sessionTitle}>Sessions</Text>
            
            <View style={styles.dateSection}>
              <Text style={styles.sectionLabel}>Select Date</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <DateSelector onDateSelect={(date) => console.log(date)} />
              </ScrollView>
            </View>

            <View style={styles.timeSection}>
              <Text style={styles.sectionLabel}>Select Time</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TimeSelector />
              </ScrollView>
            </View>

            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Appointment</Text>
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 16,
    paddingTop: 48,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#295567',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  timings: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 32,
  },
  timingBlock: {
    flex: 1,
  },
  timingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 4,
  },
  timingHours: {
    fontSize: 14,
    color: '#64748B',
  },
  sessions: {
    marginBottom: 32,
  },
  sessionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 24,
  },
  dateSection: {
    marginBottom: 24,
    marginRight: -20,
    marginLeft: -20,
  },
  timeSection: {
    marginBottom: 32,
    marginRight: -20,
    marginLeft: -20,


  },
  sectionLabel: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 12,
  },
  bookButton: {
    backgroundColor: '#295567',
    borderRadius: 15,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});