import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, SafeAreaView } from 'react-native';

const DateSelector = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState('20');
  const [selectedMonth, setSelectedMonth] = useState('March');
  const [modalVisible, setModalVisible] = useState(false);

  const dates = [
    { id: 1, date: '19', day: 'Sat' },
    { id: 2, date: '20', day: 'Sun' },
    { id: 3, date: '21', day: 'Mon' },
    { id: 4, date: '22', day: 'Tue' },
    { id: 5, date: '23', day: 'Wed' },
    { id: 5, date: '23', day: 'Wed' },
    { id: 6, date: '24', day: 'Thu' },
    { id: 7, date: '25', day: 'Fri' },
    { id: 8, date: '26', day: 'Sat' },
    { id: 9, date: '27', day: 'Sun' },
    { id: 10, date: '28', day: 'Mon' },
    { id: 11, date: '29', day: 'Tue' },
    { id: 12, date: '30', day: 'Wed' },
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setModalVisible(false);
    // You could also update the onDateSelect callback with month info if needed
  };

  return (
    <View style={styles.mainContainer}>
      {/* Month Dropdown */}
      <View style={styles.monthContainer}>
        <Text style={styles.monthTitle}>Select Month</Text>
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.dropdownButtonText}>{selectedMonth}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      </View>

      {/* Month Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select a Month</Text>
              <FlatList
                data={months}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.monthItem,
                      selectedMonth === item && styles.selectedMonthItem
                    ]}
                    onPress={() => handleMonthSelect(item)}
                  >
                    <Text 
                      style={[
                        styles.monthItemText,
                        selectedMonth === item && styles.selectedMonthItemText
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Date Selector */}
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
            <Text
              style={[
                styles.dateText,
                selectedDate === date && styles.selectedText
              ]}
            >
              {date}
            </Text>
            <Text
              style={[
                styles.dayText,
                selectedDate === date && styles.selectedText
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
    gap: 16,
  },
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
  monthContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  dropdownButton: {
    backgroundColor: '#E5EEF7',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#334155',
    fontWeight: '500',
  },
  dropdownIcon: {
    fontSize: 14,
    color: '#334155',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalContent: {
    padding: 16,
    maxHeight: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  monthItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EEF7',
  },
  selectedMonthItem: {
    backgroundColor: '#E5EEF7',
  },
  monthItemText: {
    fontSize: 16,
    color: '#334155',
  },
  selectedMonthItemText: {
    color: '#44647D',
    fontWeight: '600',
  },
});

export default DateSelector;