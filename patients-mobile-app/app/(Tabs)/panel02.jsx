import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import RecordCard from '../Components/RecordCard'; 

const Records = () => {
  const records = [
    {
      patientName: "For Nimesha",
      doctorName: "Dr. David",
      time: "12:00 PM",
      date: "Sunday, 12 June",
      presentingComplaint: "Coughing\nFever",
      diagnosis: "Dengue",
      instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
      prescription: "Lorem ipsum dolor sit 1 day amet.\nLorem ipsum dolor sit 2 times adipiscing elit.\nLorem ipsum dolor sit 10 times sit amet."
    },

    {
      patientName: "For Nimesha",
      doctorName: "Dr. David",
      time: "12:00 PM",
      date: "Sunday, 12 June",
      presentingComplaint: "Coughing\nFever",
      diagnosis: "Dengue",
      instructions: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
      prescription: "Lorem ipsum dolor sit 1 day amet.\nLorem ipsum dolor sit 2 times adipiscing elit.\nLorem ipsum dolor sit 10 times sit amet."
    },
    // Add more records as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Records</Text>
      <FlatList
        data={records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <RecordCard record={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F4EF",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2B3A4A",
    marginBottom: 20,
  },
});

export default Records;
