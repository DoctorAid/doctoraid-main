import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import HistoryCard from "../Components/HistoryCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Your History</Text>
        <HistoryCard />
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FEFAF6",
  },
  container: {
    
    flex: 1,
    backgroundColor: "#FEFAF6",
    alignItems: "left",
  },
  header: {
    fontSize: 32,
    fontFamily: "Raleway",
    fontWeight: "bold",
    color: "#295567",
    paddingTop: 20,
    paddingLeft: 30,
  },
});