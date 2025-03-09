import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DateSelector = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState('20');

  const dates = [
    { id: 1, date: '19', day: 'Sat' },
    { id: 2, date: '20', day: 'Sun' },
    { id: 3, date: '21', day: 'Mon' },
    { id: 4, date: '22', day: 'Tue' },
    { id: 5, date: '23', day: 'Wed' },
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <View style={styles.container}>
      {dates.map(({ id, date, day }) => (
        <TouchableOpacity
          key={id}
          onPress={() => handleDateSelect(date)}
          style={[
            styles.dateBox,
            selectedDate === date && styles.selectedBox
          ]}
        >
          <Text style={[styles.dateText, selectedDate === date && styles.selectedText]}>
            {date}
          </Text>
          <Text style={[styles.dayText, selectedDate === date && styles.selectedText]}>
            {day}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
  dateBox: {
    width: 60,
    height: 70,
    backgroundColor: '#E5EEF7',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedBox: {
    backgroundColor: '#44647D',
  },
  dateText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#334155',
  },
  dayText: {
    fontSize: 14,
    color: '#334155',
    marginTop: 4,
  },
  selectedText: {
    color: '#FFFFFF',
  },
});

export default DateSelector;