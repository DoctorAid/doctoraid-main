import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const AllergyField = ({ allergies, onAdd, onRemove }) => {
  const [newAllergy, setNewAllergy] = useState('');

  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      onAdd(newAllergy.trim());
      setNewAllergy('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.fieldLabel}>Allergies</Text>
      
      {/* List of existing allergies */}
      <ScrollView 
        style={styles.allergiesList}
        contentContainerStyle={styles.allergiesContent}
        horizontal={false}
        nestedScrollEnabled={true}
      >
        {allergies.length > 0 ? (
          allergies.map((allergy, index) => (
            <View key={index} style={styles.allergyItem}>
              <Text style={styles.allergyText}>{allergy}</Text>
              <TouchableOpacity 
                style={styles.removeButton} 
                onPress={() => onRemove(index)}
              >
                <Feather name="x" size={16} color="#EC5B5B" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noAllergiesText}>No allergies added</Text>
        )}
      </ScrollView>
      
      {/* Add new allergy input */}
      <View style={styles.addContainer}>
        <TextInput
          style={styles.input}
          value={newAllergy}
          onChangeText={setNewAllergy}
          placeholder="Enter allergy"
          placeholderTextColor="#A9B9CB"
        />
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddAllergy}
        >
          <Feather name="plus" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#2C4157',
    fontWeight: '500',
    marginBottom: 6,
  },
  allergiesList: {
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#E8F1F9',
    borderRadius: 8,
    backgroundColor: '#F8FBFE',
    padding: 8,
    marginBottom: 10,
  },
  allergiesContent: {
    paddingRight: 8,
  },
  allergyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E8F1F9',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  allergyText: {
    fontSize: 15,
    color: '#2C4157',
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  noAllergiesText: {
    color: '#A9B9CB',
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10,
  },
  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: '#E8F1F9',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#2C4157',
    backgroundColor: '#F8FBFE',
    marginRight: 10,
  },
  addButton: {
    width: 46,
    height: 46,
    backgroundColor: '#2C4157',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AllergyField;