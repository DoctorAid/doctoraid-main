import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import UserSwitch from '../Components/UserSwitch';

const AppointmentScreen = () => {
  const [selectedProfile, setSelectedProfile] = useState(null); // Initialize as null
  const [isUserSwitchVisible, setIsUserSwitchVisible] = useState(false);

  const handleProfileChange = (profile) => {
    setSelectedProfile(profile);
    console.log('Selected Profile:', profile);
  };

  const handleBookAppointment = () => {
    setIsUserSwitchVisible(true);
  };

  const handleConfirmBooking = () => {
    if (selectedProfile) {
      // Proceed with booking using the selectedProfile
      console.log("Booking confirmed for:", selectedProfile);
      // Here you would typically make an API call or navigate to a confirmation screen
    } else {
      // Handle the case where no profile is selected
      alert("Please select a family profile to proceed.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Appointment</Text>

      {/* ... other appointment details (doctor info, description, timings) ... */}

      <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>

      {isUserSwitchVisible && (
        <View style={styles.userSwitchContainer}>
          <UserSwitch onProfileChange={handleProfileChange} />
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (styles remain the same)
});

export default AppointmentScreen;