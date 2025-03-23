import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, Animated, Platform, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import DoctorList from '../Components/DoctorList_DoctorPage';
import DoctorAppointment from '../Components/DoctorAppointment'; // Add this import
import DoctorSearch from '../Assets/images/doctsearch.svg';

// Sample doctor data
const doctors = [
  { id: '1', name: 'Dr. Ruchitha Perera', location: 'Matara', subscribed: true },
  { id: '2', name: 'Dr. Jayampathy Dissanayaka', location: 'Digana', subscribed: false },
  { id: '3', name: 'Dr. Chirasthi Dias', location: 'Kurunagala', subscribed: false },
  { id: '4', name: 'Dr. Nimal Attanayake', location: 'Kandy', subscribed: false },
  { id: '5', name: 'Dr. Chaman Fonseka', location: 'Kandy', subscribed: false },
  { id: '6', name: 'Dr. Ganga Tennakoon', location: 'Colombo', subscribed: true },
  { id: '7', name: 'Dr. Jayashan Madushan', location: 'Galle', subscribed: true },
];

export default function Tab() {
  const [searchText, setSearchText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  
  // Filter doctors based on search input
  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (text) => {
    setSearchText(text);
    const shouldShowResults = text.length > 0;
    setShowResults(shouldShowResults);
    
    // Animate content position
    Animated.timing(animatedValue, {
      toValue: shouldShowResults ? 1 : 0,
      duration: 600,
      useNativeDriver: false,
    }).start();
  };

  // Handle doctor selection
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor); // Set selected doctor instead of navigating
  };

  const contentTranslateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -80],
  });

  const svgOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  

  return (
    <SafeAreaView style={styles.safeArea}>
      {!selectedDoctor ? (
        // Show search UI and doctor list if no doctor is selected
        <Animated.View 
          style={[
            styles.container,
            { transform: [{ translateY: contentTranslateY }] }
          ]}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Search</Text>
            <Text style={styles.subheader}>your Doctor</Text>
          </View>
          
          <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
              <Ionicons name="search" size={20} color="#858585" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Look who's available"
                value={searchText}
                onChangeText={handleSearchChange}
                onFocus={() => setShowResults(searchText.length > 0)}
              />
            </View>
            
            {showResults && (
              <View style={styles.resultsContainer}>
                {filteredDoctors.length > 0 ? (
                  <DoctorList 
                    doctors={filteredDoctors} 
                    onDoctorSelect={handleDoctorSelect} 
                  />
                ) : (
                  <View style={styles.emptyResultsContainer}>
                    <Ionicons name="medical-outline" size={24} color="#295567" />
                    <Text style={styles.emptyResultsText}>No doctors found matching "{searchText}"</Text>
                  </View>
                )}
              </View>
            )}
          </View>
    
          
          <Animated.View style={[styles.svgContainer, { opacity: svgOpacity }]}>
            <DoctorSearch width={500} height={500} />
          </Animated.View>
        </Animated.View>
      ) : (
        // Show doctor appointment screen if a doctor is selected
        <DoctorAppointment doctor={selectedDoctor} onBack={() => setSelectedDoctor(null)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FEFAF6',
  },
  container: {
    flex: 1,
    backgroundColor: '#FEFAF6',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#295567',
    textAlign: 'center',
  },
  subheader: {
    fontSize: 18,
    color: '#295567',
    textAlign: 'center',
  },
  searchContainer: {
    width: '100%',
    zIndex: 10,
    position: 'relative',
    paddingHorizontal: 5,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F0F9',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333333',
  },
  resultsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingVertical: 10,
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyResultsContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyResultsText: {
    marginTop: 10,
    color: '#295567',
    fontSize: 16,
    textAlign: 'center',
  },
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -350,
  },
});