import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
// Import Ionicons from Expo vector icons instead of Lucide
import { Ionicons } from '@expo/vector-icons';

const Scene03 = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    yourName: '',
    familyName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    relation: '',
    weight: '',
    height: ''
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const goToHome = () => {
    // Submit form data if needed
    console.log('Form submitted:', formData);
    
    // Navigate to home
    router.replace('/(Tabs)/home');
  };

  const renderStep1 = () => (
    <>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Your Name<Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your name"
          value={formData.yourName}
          onChangeText={(text) => handleChange('yourName', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Family Name<Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Family display name"
          value={formData.familyName}
          onChangeText={(text) => handleChange('familyName', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Address Line 01</Text>
        <TextInput
          style={styles.input}
          placeholder="Line 01"
          value={formData.addressLine1}
          onChangeText={(text) => handleChange('addressLine1', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Address Line 02</Text>
        <TextInput
          style={styles.input}
          placeholder="Line 02"
          value={formData.addressLine2}
          onChangeText={(text) => handleChange('addressLine2', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>City<Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="City"
          value={formData.city}
          onChangeText={(text) => handleChange('city', text)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          {/* Use Ionicons instead of Lucide */}
          <Ionicons name="chevron-forward" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </>
  );

  const renderStep2 = () => (
    <>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Relation<Text style={styles.required}>*</Text></Text>
        <TextInput
          style={styles.input}
          placeholder="Mother / Father etc"
          value={formData.relation}
          onChangeText={(text) => handleChange('relation', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Weight</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          value={formData.weight}
          onChangeText={(text) => handleChange('weight', text)}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Height</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter height"
          value={formData.height}
          onChangeText={(text) => handleChange('height', text)}
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          {/* Use Ionicons instead of Lucide */}
          <Ionicons name="chevron-back" size={24} color="#5591BC" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.doneButton} onPress={goToHome}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>Lets Get Started</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressIndicator, 
                step === 1 ? styles.activeIndicatorLeft : styles.inactiveIndicatorLeft
              ]} 
            />
            <View 
              style={[
                styles.progressIndicator, 
                step === 2 ? styles.activeIndicatorRight : styles.inactiveIndicatorRight
              ]} 
            />
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Tell us about you</Text>
          <Text style={styles.formSubtitle}>You will be the primary member of the family.</Text>

          {step === 1 ? renderStep1() : renderStep2()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F2F8',
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#2C5C74',
    marginBottom: 20,
  },
  progressBar: {
    flexDirection: 'row',
    width: 60,
    height: 6,
  },
  progressIndicator: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  activeIndicatorLeft: {
    backgroundColor: '#2C5C74',
    marginRight: 3,
  },
  inactiveIndicatorLeft: {
    backgroundColor: '#D9D9D9',
    marginRight: 3,
  },
  activeIndicatorRight: {
    backgroundColor: '#2C5C74',
    marginLeft: 3,
  },
  inactiveIndicatorRight: {
    backgroundColor: '#D9D9D9',
    marginLeft: 3,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    flex: 1,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2C5C74',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#95A7B1',
    marginBottom: 24,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#2C5C74',
    marginBottom: 8,
    fontWeight: '500',
  },
  required: {
    color: '#E74C3C',
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: '#5591BC',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5591BC',
  },
  doneButton: {
    backgroundColor: '#5591BC',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});

export default Scene03;