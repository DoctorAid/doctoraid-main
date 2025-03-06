import React from 'react';
import { View, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import RecordCard, { records } from '../Components/RecordCard';
import EmptyRecordsSVG from '../Assets/images/recordguy.svg';


const Records = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Text style={styles.title}>Records</Text>
      <FlatList
        data={records}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <RecordCard record={item} />}
        ListEmptyComponent={ // Display SVG if no records exist
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No records found</Text>
          </View>
        }
        ListFooterComponent={ // Add SVG at the bottom of the list
          <View style={styles.svgContainer}>
            <EmptyRecordsSVG width={250} height={250} />
          </View>
        }
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
  svgContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: -30,
  },
});

export default Records;
