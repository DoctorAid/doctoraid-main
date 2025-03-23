import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const DoctorCard = ({ doctor }) => {
  // Using a constant image URL for all doctors
  const doctorImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxNMPc0tFsIwbXWYrR_6VR9Whnt3O9ut-8fQ&s";
  
  return (
    <TouchableOpacity style={styles.card}>
      <Image 
        source={{ uri: doctorImageUrl }} 
        style={styles.doctorImage} 
      />
      <Text style={styles.doctorName}>{doctor.name}</Text>
      <Text style={styles.doctorLocation}>{doctor.location}</Text>
    </TouchableOpacity>
  );
};

const SubscribedDoctors = () => {
  // Sample data - replace with your actual data
  const doctors = [
    {
      id: '1',
      name: 'Dr.Sandith Rajapakshe',
      location: 'Kandy',
    },
    {
      id: '2',
      name: 'Dr.Nimal Attanayake',
      location: 'Kandy',
    },
    {
      id: '3',
      name: 'Dr.Chaman Fonseka',
      location: 'Kandy',
    },
    // Add more doctors as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Nearest Doctors</Text>
      <FlatList
        data={doctors}
        renderItem={({ item }) => <DoctorCard doctor={item} />}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#ffffff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c4f6b',
    marginBottom: 16,
    paddingLeft: 16,
  },
  listContainer: {
    paddingRight: 16,
  },
  card: {
    width: 120,
    marginRight: 12,
    backgroundColor: '#f5f5dc', // Beige color similar to your image
    borderRadius: 10,
    overflow: 'hidden',
    padding: 0,
  },
  doctorImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  doctorName: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingTop: 8,
    color: '#333',
  },
  doctorLocation: {
    fontSize: 10,
    color: '#666',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
});

export default SubscribedDoctors;