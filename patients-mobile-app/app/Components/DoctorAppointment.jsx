import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Modal, 
  Alert 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateSelector from '../Components/DoctorAppoinmentDate';
import TimeSelector from '../Components/DoctorAppointmentTime';
import UserSwitch from '../Components/UserSwitch';
import AppointmentNote from '../Components/AppointmentNote';

export default function AppointmentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const doctor = { 
    id: '1', 
    name: 'Dr. Lakee Jayamanne', 
    location: 'Kandy', 
    subscribed: true 
  };
  
  const [isSubscribed, setIsSubscribed] = useState(doctor.subscribed);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentNote, setAppointmentNote] = useState('');
  const [validationError, setValidationError] = useState('');
  
  // Sample family profiles
  const familyProfiles = [
    {
      id: '1',
      name: 'Nimesha Dahanayake',
      relation: 'Daugher',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
    },
    {
      id: '2',
      name: 'Sakith Seneviratne',
      relation: 'Son',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
    },
    {
      id: '3',
      name: 'Lakmindee',
      relation: 'Daughter',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'
    },
    {
      id: '4',
      name: 'Sandith Thenuwara',
      relation: 'Grand Father',
      image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=344&q=80'
    }
  ];
  
  const [selectedProfile, setSelectedProfile] = useState(familyProfiles[0]);
  
  const toggleSubscription = () => {
    setIsSubscribed(!isSubscribed);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };
  
  const handleDateSelect = (date) => {
    console.log("Date selected:", date);
    setSelectedDate(date);
    setValidationError(''); // Clear validation error when user selects date
  };
  
  const handleTimeSelect = (time) => {
    console.log("Time selected:", time);
    setSelectedTime(time);
    setValidationError(''); // Clear validation error when user selects time
  };
  
  const handleBookingPress = () => {
    console.log("Current selected date:", selectedDate);
    console.log("Current selected time:", selectedTime);
    
    // Validate date and time selection
    if (!selectedDate && !selectedTime) {
      setValidationError('Please select both date and time');
    } else if (!selectedDate) {
      setValidationError('Please select a date');
    } else if (!selectedTime) {
      setValidationError('Please select a time');
    } else {
      // Clear any validation errors
      setValidationError('');
      // Open booking modal
      setShowBookingModal(true);
    }
  };
  
  const handleCloseModal = () => {
    setShowBookingModal(false);
  };
  
  const handleProfileChange = (profile) => {
    setSelectedProfile(profile);
  };
  
  const handleNoteChange = (text) => {
    setAppointmentNote(text);
  };
  
  const handleBookNow = () => {
    // Create appointment object
    const appointment = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      patientId: selectedProfile.id,
      patientName: selectedProfile.name,
      patientRelation: selectedProfile.relation,
      note: appointmentNote,
      date: selectedDate,
      time: selectedTime
    };
    
    console.log('Booking appointment:', appointment);
    
    // Close modal
    setShowBookingModal(false);
    
    // Show success message
    Alert.alert(
      "Appointment Booked",
      `Your appointment with ${doctor.name} has been scheduled for ${selectedDate} at ${selectedTime}.`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
              <Ionicons name="chevron-back" size={24} color="#334155" />
            </TouchableOpacity>
          </View>

          <View style={styles.doctorInfo}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60' }}
              style={styles.doctorImage}
            />
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorLocation}>{doctor.location}</Text>
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="call" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="location" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.subscribeButton, isSubscribed && styles.subscribedButton]}
                  onPress={toggleSubscription}
                >
                  <Ionicons 
                    name={isSubscribed ? "notifications" : "notifications-outline"} 
                    size={20} 
                    color={isSubscribed ? "#295567" : "#FFFFFF"} 
                  />
                  <Text style={[styles.subscribeText, isSubscribed && styles.subscribedButtonText]}>
                    {isSubscribed ? "Subscribed" : "Subscribe"}
                  </Text>
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
                <DateSelector onDateSelect={handleDateSelect} />
              </ScrollView>
            </View>

            <View style={styles.timeSection}>
              <Text style={styles.sectionLabel}>Select Time</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TimeSelector onTimeSelect={handleTimeSelect} /> 
                           </ScrollView>
            </View>
            
            {validationError ? (
              <Text style={styles.errorText}>{validationError}</Text>
            ) : null}

            <TouchableOpacity 
              style={styles.bookButton}
              onPress={handleBookingPress}
            >
              <Text style={styles.bookButtonText}>Book Appointment</Text>
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book Appointment</Text>
              <TouchableOpacity onPress={handleCloseModal}>
                <Ionicons name="close" size={24} color="#334155" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              <View style={styles.appointmentDetails}>
                <Text style={styles.detailsLabel}>Doctor</Text>
                <Text style={styles.detailsValue}>{doctor.name}</Text>
                
                <Text style={styles.detailsLabel}>Date & Time</Text>
                <Text style={styles.detailsValue}>
                  {selectedDate && selectedTime ? `${selectedDate}, ${selectedTime}` : 'Not selected'}
                </Text>
              </View>
              
              {/* Family Profile Selection */}
              <View style={styles.profileSelectionContainer}>
                <UserSwitch 
                  profiles={familyProfiles}
                  selectedProfile={selectedProfile}
                  onProfileChange={handleProfileChange}
                />
              </View>
              
              {/* Note Input */}
              <View style={styles.noteContainer}>
                <AppointmentNote 
                  onNoteChange={handleNoteChange}
                  initialNote={appointmentNote}
                />
              </View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.bookNowButton}
                onPress={handleBookNow}
              >
                <Text style={styles.bookNowButtonText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    marginBottom: 8,
  },
  doctorLocation: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#295567',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subscribeButton: {
    flexDirection: 'row',
    backgroundColor: '#295567',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    marginLeft: 8,
  },
  subscribedButton: {
    backgroundColor: '#E6F4F1',
    borderWidth: 1,
    borderColor: '#295567',
  },
  subscribeText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 4,
  },
  subscribedButtonText: {
    color: '#295567',
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
    marginBottom: 12, // Reduced to make room for validation error
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
  
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: '70%',
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#334155',
  },
  modalBody: {
    padding: 20,
    maxHeight: '75%',
  },
  appointmentDetails: {
    marginBottom: 24,
    backgroundColor: '#F8FAFC',
    padding: 16,
    borderRadius: 12,
  },
  detailsLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  detailsValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 16,
  },
  profileSelectionContainer: {
    marginBottom: 24,
  },
  noteContainer: {
    marginBottom: 24,
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  bookNowButton: {
    backgroundColor: '#295567',
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
  },
  bookNowButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});