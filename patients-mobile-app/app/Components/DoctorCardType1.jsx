// DoctorCardType1.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Animated } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { Calendar, Clock } from "lucide-react-native";

const appointments = [
  {
    id: '1',
    doctorName: 'Dr. Lakee Jayamanne',
    patientName: 'Nimesha',
    date: 'Sunday, 12 June',
    time: '11:00 AM - 12:00 PM',
  },
];

const DoctorCard = ({ doctorName, patientName, date, time, onPress, showPinEntry, onPinSubmit }) => {
  const [pin, setPin] = useState("");
  
  const handlePinSubmit = () => {
    if (pin.trim().length > 0) {
      console.log("PIN submitted:", pin);
      onPinSubmit();
    } else {
      console.log("Please enter a valid PIN");
    }
  };
  
  return (
    <TouchableOpacity
      onPress={showPinEntry ? null : onPress}
      style={styles.card}
      activeOpacity={0.8}
    >
      <View style={styles.header}>  
        <View style={styles.imagePlaceholder} />
        <View style={styles.textContainer}>
          <Text style={styles.doctorName}>{doctorName}</Text>
          <Text style={styles.forPatient}>
            For <Text style={styles.patientName}>{patientName}</Text>
          </Text>
        </View>
        <ChevronRight size={24} color="white" />
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Calendar size={16} color="#AFCDE7" />
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.row}>
        <Clock size={16} color="#AFCDE7" />
        <Text style={styles.time}>{time}</Text>
      </View>

      {/* PIN Entry Section - Only shown when showPinEntry is true */}
      {showPinEntry && (
        <Animated.View style={styles.pinEntryContainer}>
          <Text style={styles.pinEntryTitle}>Enter the pin number</Text>
          
          {/* PIN Input Field */}
          <TextInput
            style={styles.input}
            placeholder="Enter Pin |"
            placeholderTextColor="#AFCDE7"
            secureTextEntry
            value={pin}
            onChangeText={setPin}
            keyboardType="number-pad"
          />
          
          {/* Enter Queue Button */}
          <TouchableOpacity style={styles.button} onPress={handlePinSubmit}>
            <Text style={styles.buttonText}>Enter Queue</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const DoctorCardType1 = ({ onPress }) => {
  const [showPinEntry, setShowPinEntry] = useState(false);
  
  const handleCardPress = () => {
    setShowPinEntry(true);
  };
  
  const handlePinSubmit = () => {
    // Move to the next step
    onPress();
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Your</Text>
      <Text style={styles.titleText}>Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DoctorCard 
            doctorName={item.doctorName}
            patientName={item.patientName}
            date={item.date}
            time={item.time}
            onPress={handleCardPress}
            showPinEntry={showPinEntry}
            onPinSubmit={handlePinSubmit}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  titleText: {
    paddingHorizontal: 10,
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#265A69',
  },
  card: {
    backgroundColor: '#265A69', 
    padding: 20, 
    borderRadius: 15, 
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#AFCDE7",
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imagePlaceholder: {
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    backgroundColor: '#AFCDE7',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  doctorName: {
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold'
  },
  forPatient: {
    color: '#AFCDE7', 
    fontSize: 14
  },
  patientName: {
    fontWeight: 'bold',
    color: '#AFCDE7',
  },
  divider: {
    borderBottomWidth: 1, 
    borderBottomColor: '#AFCDE7', 
    marginVertical: 10
  },
  row: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 5
  },
  date: {
    color: '#AFCDE7', 
    fontSize: 14, 
    marginLeft: 8
  },
  time: {
    color: '#AFCDE7', 
    fontSize: 14, 
    marginLeft: 8
  },
  // Pin Entry styles
  pinEntryContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#AFCDE7',
    paddingTop: 15,
  },
  pinEntryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#AFCDE7",
    padding: 10,
    borderRadius: 10,
    color: "white",
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#AFCDE7",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#164A63",
    fontWeight: "bold",
  },
});

export default DoctorCardType1;