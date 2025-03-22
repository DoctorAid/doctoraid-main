import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TimeSelector = ({ onTimeSelect }) => {
  const [selectedTime, setSelectedTime] = useState('9:10 am');

  const times = [
    { id: 1, time: '9:00 am' },
    { id: 2, time: '9:10 am' },
    { id: 3, time: '9:20 am' },
    { id: 4, time: '9:30 am' },
  ];

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    // This is the key line that was missing - call the callback function
    if (onTimeSelect) {
      onTimeSelect(time);
    }
  };

  return (
    <View style={styles.container}>
      {times.map(({ id, time }) => (
        <TouchableOpacity
          key={id}
          onPress={() => handleTimeSelection(time)}
          style={[
            styles.timeBox,
            selectedTime === time && styles.selectedBox
          ]}
        >
          <Text style={[styles.timeText, selectedTime === time && styles.selectedText]}>
            {time}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
  timeBox: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#E5EEF7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBox: {
    backgroundColor: '#44647D',
  },
  timeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#334155',
  },
  selectedText: {
    color: '#FFFFFF',
  },
});

export default TimeSelector;