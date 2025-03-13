import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DoctorItem = ({ doctor }) => {
  return (
    <Pressable 
      style={({ pressed }) => [
        styles.doctorItem,
        pressed && styles.doctorItemPressed
      ]}
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
    marginLeft: 10,
  },
});

export default DoctorItem;