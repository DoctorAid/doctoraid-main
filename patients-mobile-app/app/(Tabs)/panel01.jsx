import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import HistoryCard from '../Components/HistoryCard';
import react from "react";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Tab() {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Text style={styles.header}>Your History</Text>
      <ScrollView contentContainerStyle={styles.ScrollView}>
        {[...Array(5)].map((_, index) => (
          <HistoryCard key={index}/>
        ))}
        <TouchableOpacity style={styles.seeMoreButton}>
          <Text style={styles.seeMoreText}>See More</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    marginBottom:20,
  },

  header: {
    fontSize:24,
    fontWeight: "bold",
    color: "#333",
    margin: 20,
  },

  ScrollView: {
    alignItems: "center",
  },

  seeMoreButton: {
    backgroundColor: "#90C8F4",
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    alignItems: "center",
    width: "50%",
  },

  seeMoreText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
