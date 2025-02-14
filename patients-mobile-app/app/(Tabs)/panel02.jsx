import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import RecordCard, { records } from '../Components/RecordCard'; 

const Records = () => {

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
