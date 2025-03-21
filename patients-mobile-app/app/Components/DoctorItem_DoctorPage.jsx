import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DoctorItem = ({ doctor, onPress }) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.doctorItem,
        pressed && styles.doctorItemPressed
      ]}
      onPress={onPress}
    >
      <View style={styles.doctorProfile}>
        <View style={styles.doctorAvatar}>
          <Ionicons name="person-circle" size={30} color="#295567" />
        </View>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>{doctor.name}</Text>
          <Text style={styles.doctorLocation}>{doctor.location}</Text>
        </View>
      </View>
      {doctor.subscribed && (
        <View style={styles.subscriptionIndicator}>
          <Ionicons name="checkmark-circle" size={20} color="#295567" />
        </View>
      )}
      <View style={styles.chevronContainer}>
        <Ionicons name="chevron-forward" size={20} color="#AAAAAA" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  doctorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#D9E6F2',
  },
  doctorItemPressed: {
    backgroundColor: 'rgba(41, 85, 103, 0.05)',
  },
  doctorProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  doctorAvatar: {
    width: 30,
    height: 30,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorInfo: {
    justifyContent: 'center',
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  doctorLocation: {
    fontSize: 14,
    color: '#757575',
  },
  subscriptionIndicator: {
    marginRight: 10,
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default DoctorItem;