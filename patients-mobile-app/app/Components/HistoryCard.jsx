import React from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";
import { Clock, Calendar } from "lucide-react-native"; // Lucide Icons

const AppointmentCard = ({ name, doctor, time, date }) => {
  return (
    <ScrollView>
    <View style={styles.cardContainer}>
      {/* Circle Placeholder for Image */}
      <View style={styles.imagePlaceholder}></View>

      {/* Appointment Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.nameText}>{`For ${name}`}</Text>
        <Text style={styles.doctorText}>{doctor}</Text>
      </View>

      {/* Time and Date */}
      <View style={styles.dateTimeContainer}>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{time}</Text>
          <Clock size={16} color="#6B7280" />
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{date}</Text>
          <Calendar size={16} color="#6B7280" />
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

const HistoryCard = () => {
  const appointments = [
    {
      id: "1",
      name: "Amaya",
      doctor: "Dr. David",
      time: "12:00 PM",
      date: "Sunday, 12 June",
    },
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container : {
    backgroundColor: "#FEFAF6",
    flex:1,
    padding: 5,
    paddingHorizontal: 30,
    width: "100%",
  },

  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#E8F1F9",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius:1.41,
    elevation: 2,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#BAE6FD",
  },

  imagePlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },

  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },

  doctorText: {
    fontSize: 14,
    color: "#6B7280",
  },

  dateTimeContainer: {
    alignItems: "flex-end",
  },

  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },

  timeText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
    marginRight: 4,
  },

  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateText: {
    fontSize: 14,
    color: "#6B7280",
    marginRight: 4,
  },


});

export default HistoryCard;
