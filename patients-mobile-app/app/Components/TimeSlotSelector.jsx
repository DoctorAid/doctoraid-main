import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';


const TimeSlotSelector = ({ session, onTimeSelect }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  //  time slots based on the selected session
  useEffect(() => {
    if (session) {
      // Clear selected time slot when session changes
      setSelectedTimeSlot(null);
      
      //  time slots for the selected session
      // This is a simple example that creates 10-minute intervals
      const generatedSlots = generateTimeSlots(session.startTime, session.endTime);
      setTimeSlots(generatedSlots);
    } else {
      setTimeSlots([]);
    }
  }, [session]);

  // Function to generate time slots based on start and end time
  const generateTimeSlots = (startTime, endTime) => {
    const slots = [];
    const start = parseTime(startTime);
    const end = parseTime(endTime);
    
    // Create slots every 10 minutes
    let currentTime = new Date(start);
    let id = 1;
    
    while (currentTime < end) {
      const isAvailable = Math.random() > 0.3; // Random availability for demo
      
      // Only add available slots
      if (isAvailable) {
        slots.push({
          id: id,
          time: formatTime(currentTime),
          available: true,
        });
      }
      
      id++;
      // Add 10 minutes
      currentTime = new Date(currentTime.getTime() + 10 * 60000);
    }
    
    return slots;
  };

  // Parse time string to Date object
  const parseTime = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period.toLowerCase() === 'pm' && hours < 12) {
      hours += 12;
    } else if (period.toLowerCase() === 'am' && hours === 12) {
      hours = 0;
    }
    
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  // Format Date object to time string
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'pm' : 'am';
    
    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
    
    return `${hours}:${minutes} ${period}`;
  };

  const handleTimeSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
    onTimeSelect(timeSlot.time);
  };

  if (!session) {
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>Select a session to view available time slots</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Time Slot</Text>
      {timeSlots.length > 0 ? (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.timeSlot,
                selectedTimeSlot?.id === slot.id && styles.selectedTimeSlot
              ]}
              onPress={() => handleTimeSelect(slot)}
            >
              <Text 
                style={[
                  styles.timeText,
                  selectedTimeSlot?.id === slot.id && styles.selectedText
                ]}
              >
                {slot.time}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>No available time slots for this session</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  timeSlot: {
    backgroundColor: '#E5EEF7',
    padding: 12,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 110,
    alignItems: 'center',
  },
  selectedTimeSlot: {
    backgroundColor: '#295567',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },

  selectedText: {
    color: '#FFFFFF',
  },
  placeholderContainer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    margin: 16,
  },
  placeholderText: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default TimeSlotSelector;