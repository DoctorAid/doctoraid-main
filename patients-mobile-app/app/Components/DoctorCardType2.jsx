import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Calendar, Clock } from "lucide-react-native";

const doctorAppointments = [
  {
    id: "1",
    name: "Dr. Chanugi",
    location: "Kandy",
    date: "Sunday, 12 June",
    time: "11:00 - 12:00 AM",
  },
  {
    id: "2",
    name: "Dr. Senarath",
    location: "Colombo",
    date: "Monday, 13 June",
    time: "10:00 - 11:00 AM",
  },
  {
    id: "3",
    name: "Dr. Wijesinghe",
    location: "Galle",
    date: "Tuesday, 14 June",
    time: "9:00 - 10:00 AM",
  },
  {
    id: "4",
    name: "Dr. Perera",
    location: "Jaffna",
    date: "Wednesday, 15 June",
    time: "2:00 - 3:00 PM",
  },
];

const DoctorCardType2 = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.imagePlaceholder} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.location}>{item.location}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Calendar size={16} color="#7A7D9C" />
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View style={styles.row}>
          <Clock size={16} color="#7A7D9C" />
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Appointments</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function DoctorCardList() {
  return (
    <View style={styles.container}>
      <FlatList
        data={doctorAppointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DoctorCardType2 item={item} />}
        horizontal={true} // Enables horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hides scroll bar for cleaner UI
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
    backgroundColor: "#F5F7FA",
    paddingLeft: 10, // Left padding for better horizontal scrolling
  },
  card: {
    backgroundColor: "white",
    width: 320,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginRight: 15, // Adds spacing between horizontally swipeable cards
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#d9d9d9",
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "column",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1D1E2C",
  },
  location: {
    fontSize: 14,
    color: "#7A7D9C",
  },
  infoContainer: {
    borderTopWidth: 1,
    borderColor: "#EAEAEA",
    paddingTop: 10,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#7A7D9C",
    marginLeft: 5,
  },
  time: {
    fontSize: 14,
    color: "#7A7D9C",
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#A7D2FA",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#1D1E2C",
    fontWeight: "bold",
  },
});
