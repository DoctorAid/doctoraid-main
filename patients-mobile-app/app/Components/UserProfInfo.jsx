import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

function Layout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen 
          name="index" 
          options={{
            title: 'Medical Profile',
            headerShown: true,
            headerStyle: {
              backgroundColor: '#F5F6F8',
            },
            headerTitleStyle: {
              color: '#435B71',
              fontSize: 20,
              fontWeight: '600',
            },
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

const InfoSection = ({ title, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity style={styles.editButton}>
        <Ionicons name="pencil" size={24} color="#435B71" />
      </TouchableOpacity>
    </View>
    <View style={styles.sectionContent}>
      {children}
    </View>
  </View>
);

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const MedicalProfile = () => {
  const generalInfo = {
    name: 'Nimesha Dahanayake',
    relation: 'Son',
    birthDate: '10.02.2014',
    age: '10 years',
    weight: '50kg',
    height: "5'3",
    gender: 'Female'
  };

  const medicalInfo = {
    allergies: 'Arya Muller',
    bloodType: 'Arya Muller'
  };

  return (
    <>
      <Layout />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <InfoSection title="General Info">
          <InfoRow label="Name" value={generalInfo.name} />
          <InfoRow label="Relation" value={generalInfo.relation} />
          <InfoRow label="Birth Date" value={generalInfo.birthDate} />
          <InfoRow label="Age" value={generalInfo.age} />
          <InfoRow label="Weight" value={generalInfo.weight} />
          <InfoRow label="Height" value={generalInfo.height} />
          <InfoRow label="Gender" value={generalInfo.gender} />
        </InfoSection>

        <InfoSection title="Medical Info">
          <InfoRow label="Allergies" value={medicalInfo.allergies} />
          <InfoRow label="Blood Type" value={medicalInfo.bloodType} />
        </InfoSection>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6F8',
  },
  contentContainer: {
    padding: 20,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#435B71',
  },
  editButton: {
    padding: 8,
  },
  sectionContent: {
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  label: {
    fontSize: 16,
    color: '#435B71',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#7A8D9C',
  },
});

export default MedicalProfile;