import React from "react";
import { View, FlatList } from "react-native";
import AppointmentCard from "./AppointmentCard"; // Adjust the import path as needed

const HistoryCard = () => {
  const appointments = [
    {
      id: "1",
      name: "Amaya",
      doctor: "Dr. David",
      time: "12:00 PM",
      date: "Sunday, 12 June",
    },
    // Add more appointments here
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppointmentCard
            name={item.name}
            doctor={item.doctor}
            time={item.time}
            date={item.date}
            
          />
          
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FEFAF6",

  },
  flatListContent: {
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,

  },
};

export default HistoryCard;