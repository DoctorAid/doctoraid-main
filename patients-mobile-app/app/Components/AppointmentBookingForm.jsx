import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import UserSwitch from './UserSwitch'; // Import the UserSwitch component
import AppointmentNote from './AppointmentNote'; // Import the AppointmentNote component

const AppointmentBookingForm = ({ route }) => {
  const navigation = useNavigation();
  const { doctor } = route.params || { 
    doctor: { 
      id: '1', 
      name: 'Dr. Lakee Jayamanne', 
      location: 'Kandy', 
      subscribed: true 
    } 
  };
  
  // Sample family profiles
  const familyProfiles = [
    {
      id: '1',
      name: 'Nimesha Dahanayake',
      relation: 'Daugher', // Note: typo in the original UI
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
  
  // State management
  const [selectedProfile, setSelectedProfile] = useState(familyProfiles[0]);
  const [appointmentNote, setAppointmentNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleProfileChange = (profile) => {
    setSelectedProfile(profile);
  };
  
  const handleNoteChange = (text) => {
    setAppointmentNote(text);
  };
  
  const handleGoBack = () => {
    navigation.goBack();
  };
  
  const handleBookNow = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Create appointment object
      const appointment = {
        doctorId: doctor.id,
        doctorName: doctor.name,
        patientId: selectedProfile.id,
        patientName: selectedProfile.name,
        patientRelation: selectedProfile.relation,
        note: appointmentNote,
        date: new Date().toISOString(),
      };
      
      console.log('Booking appointment:', appointment);
      
      // Reset submission state
      setIsSubmitting(false);
      
      // Navigate to confirmation or back to previous screen
      navigation.navigate('AppointmentConfirmation', { appointment });
    }, 1000);
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Feather name="chevron-left" size={24} color="#334155" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Appointment</Text>
          <View style={styles.headerRight} />
        </View>
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            {/* User selection component */}
            <UserSwitch 
              profiles={familyProfiles}
              selectedProfile={selectedProfile}
              onProfileChange={handleProfileChange}
            />
            
            {/* Description/Note component */}
            <AppointmentNote 
              onNoteChange={handleNoteChange}
              initialNote={appointmentNote}
            />
          </View>
        </ScrollView>
        
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.bookButton} 
            onPress={handleBookNow}
            disabled={isSubmitting}
          >
            <Text style={styles.bookButtonText}>
              {isSubmitting ? 'Processing...' : 'Book Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  bookButton: {
    backgroundColor: '#295567',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AppointmentBookingForm;