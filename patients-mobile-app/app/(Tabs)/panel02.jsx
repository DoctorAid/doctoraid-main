import React from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import RecordCard, { records } from '../Components/RecordCard'; 

const Records = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Records</Text>
        <FlatList
          data={records}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <RecordCard record={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F4EF",
  },
  container: {
    flex: 1,
    paddingTop: 40,
    paddingRight: 40,
    paddingLeft: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#2B3A4A",
    marginBottom: 20,
  },
});

export default Records;
