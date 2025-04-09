import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SessionSelector from './SessionSelector';
import TimeSlotSelector from './TimeSlotSelector';

// Mock data for sessions
const mockSessions = [
  {
    id: '1',
    name: 'Morning Consultation',
    startTime: '9:00 am',
    endTime: '11:30 am',
  },
  {
    id: '2',
    name: 'Afternoon Session',
    startTime: '1:00 pm',
    endTime: '3:30 pm',
  },
  {
    id: '3',
    name: 'Evening Consultation',
    startTime: '4:00 pm',
    endTime: '6:00 pm',
  },
  {
    id: '4',
    name: 'Special Consultation',
    startTime: '6:30 pm',
    endTime: '8:00 pm',
  },
];

const BookingSection = ({ onBookingComplete, fadeAnim, buttonScaleAnim }) => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [errorFadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animation for showing/hiding validation error
    if (validationError) {
      Animated.timing(errorFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(errorFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [validationError]);

  const handleSessionSelect = (session) => {
    setSelectedSession(session);
    setSelectedTime(null);
    setValidationError('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setValidationError('');
  };

  const handleBookingPress = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Validate selections
    if (!selectedSession && !selectedTime) {
      setValidationError('Please select both session and time slot');
    } else if (!selectedSession) {
      setValidationError('Please select a session');
    } else if (!selectedTime) {
      setValidationError('Please select a time slot');
    } else {
      // Clear any validation errors
      setValidationError('');
      
      // Proceed with booking
      onBookingComplete({
        session: selectedSession,
        time: selectedTime,
        date: selectedSession.date || new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      });
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        { 
          opacity: fadeAnim,
          transform: [
            { translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [20, 0]
            }) }
          ]
        }
      ]}
    >
      <Text style={styles.title}>Book Appointment</Text>
      
      <SessionSelector 
        sessions={mockSessions} 
        onSessionSelect={handleSessionSelect} 
      />
      
      <TimeSlotSelector 
        session={selectedSession} 
        onTimeSelect={handleTimeSelect} 
      />
      
      <View style={styles.selectedInfoContainer}>
        {selectedSession && selectedTime ? (
          <View style={styles.selectionSummary}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={18} color="#295567" />
              <Text style={styles.selectionText}>
                {selectedSession.date}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={18} color="#295567" />
              <Text style={styles.selectionText}>
                {selectedSession.name} - {selectedTime}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
      
      <Animated.View style={{ opacity: errorFadeAnim }}>
        {validationError ? (
          <Text style={styles.errorText}>{validationError}</Text>
        ) : null}
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
        <TouchableOpacity 
          style={styles.bookButton}
          onPress={handleBookingPress}
          activeOpacity={0.9}
        >
          <Text style={styles.bookButtonText}>Book Appointment</Text>
          <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  bookButton: {
    backgroundColor: '#295567',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  bookButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  selectedInfoContainer: {
    marginBottom: 16,
  },
  selectionSummary: {
    backgroundColor: '#E6F4F1',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#295567',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  selectionText: {
    color: '#295567',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
});

export default BookingSection;