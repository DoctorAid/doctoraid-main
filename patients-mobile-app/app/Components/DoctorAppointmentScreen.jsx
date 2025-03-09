import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import UserSwitch from '../Components/UserSwitch';

export default function BookAppointment() {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [note, setNote] = useState('');

  const handleProfileChange = (profile) => {
    setSelectedProfile(profile);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
              <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Book Appointment</Text>
          </View>

          <View style={styles.content}>
            <UserSwitch onProfileChange={handleProfileChange} />
            
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionLabel}>Description</Text>
              <TextInput
                style={styles.noteInput}
                placeholder="Add Note"
                placeholderTextColor="#A0A0A0"
                value={note}
                onChangeText={setNote}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.bookButton, !selectedProfile && styles.bookButtonDisabled]}
            disabled={!selectedProfile}
          >
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E8F1F9',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#2C4157',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2C4157',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C4157',
    marginBottom: 10,
  },
  noteInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 15,
    height: 120,
    fontSize: 16,
    color: '#2C4157',
    borderWidth: 1,
    borderColor: '#E8F1F9',
  },
  appointmentDetails: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C4157',
    marginBottom: 12,
  },
  detailsCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8F1F9',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 16,
    color: '#2C4157',
    fontWeight: '500',
  },
  dateSelector: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8F1F9',
  },
  dateText: {
    color: '#6B7C8F',
    fontSize: 14,
  },
  timeSelector: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E8F1F9',
  },
  timeText: {
    color: '#6B7C8F',
    fontSize: 14,
  },
  bookButton: {
    backgroundColor: '#2C4157',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});