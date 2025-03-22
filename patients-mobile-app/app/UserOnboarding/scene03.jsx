import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Animated, 
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
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

  // Screen dimensions
  const { width, height } = Dimensions.get('window');
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const formSlideAnim = useRef(new Animated.Value(height)).current;

  // Start with form sliding up animation on component mount
  useEffect(() => {
    Animated.spring(formSlideAnim, {
      toValue: 0,
      tension: 45,
      friction: 10,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const animateStepTransition = (nextStep) => {
    // Slide out current step
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Change step
      setStep(nextStep);
      // Slide in next step
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleNext = () => {
    animateStepTransition(2);
  };

  const handleBack = () => {
    animateStepTransition(1);
  };

  const goToHome = () => {
    // Submit form data if needed
    console.log('Form submitted:', formData);
    
    // Animate the form sliding down first
    Animated.timing(formSlideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Then fade out before navigation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        // Navigate to home
        router.replace('/(Tabs)/home');
      });
    });
  };

  // Calculate current form step
  const currentFormStep = step;

  const renderStep1 = () => (
    <Animated.View style={{ opacity: fadeAnim }}>
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
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <Ionicons name="chevron-forward" size={20} color="#ffffff" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  const renderStep2 = () => (
    <Animated.View style={{ opacity: fadeAnim }}>
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
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Height</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter height"
          value={formData.height}
          onChangeText={(text) => handleChange('height', text)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={20} color="#5591BC" style={styles.buttonIconBack} />
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.doneButton} 
          onPress={goToHome}
          activeOpacity={0.8}
        >
          <Text style={styles.doneButtonText}>Complete</Text>
          <Ionicons name="checkmark" size={20} color="#FFFFFF" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Let's Get Started</Text>
          <Text style={styles.subtitle}>Complete your profile to customize your experience</Text>
        </View>

        {/* Form container with slide up animation */}
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <Animated.View 
            style={[
              styles.formOuterContainer,
              { transform: [{ translateY: formSlideAnim }] }
            ]}
          >
            <View style={styles.formHandle} />
            
            <ScrollView contentContainerStyle={styles.scrollView}>
              <View style={styles.formContainer}>
                {/* Form step indicator */}
                <View style={styles.formProgressContainer}>
                  <View style={styles.formProgressBar}>
                    <View 
                      style={[
                        styles.formProgressFill, 
                        { width: `${(currentFormStep / 2) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.formStepText}>Form Step {currentFormStep} of 2</Text>
                </View>
                
                <Text style={styles.formTitle}>Tell us about you</Text>
                <Text style={styles.formSubtitle}>You will be the primary member of the family.</Text>

                {currentFormStep === 1 ? renderStep1() : renderStep2()}
              </View>
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F2F8',
  },
  mainContent: {
    flex: 1,
    position: 'relative',
    paddingTop: 40, // Added padding to offset removal of the top bar
  },
  header: {
    paddingVertical: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
    color: '#2C5C74',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#5591BC',
    textAlign: 'center',
    fontFamily: 'Raleway-Regular',
  },
  keyboardAvoid: {
    flex: 1,
  },
  formOuterContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
  },
  formHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  formContainer: {
    padding: 24,
    paddingTop: 8,
  },
  formProgressContainer: {
    width: '100%',
    marginBottom: 20,
  },
  formProgressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#D9D9D9',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  formProgressFill: {
    height: '100%',
    backgroundColor: '#5591BC',
    borderRadius: 2,
  },
  formStepText: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#5591BC',
    fontFamily: 'Raleway-Regular',
  },
  formTitle: {
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
    color: '#2C5C74',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#95A7B1',
    marginBottom: 24,
    fontFamily: 'Raleway-Regular',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#2C5C74',
    marginBottom: 8,
    fontWeight: '500',
    fontFamily: 'Raleway-Medium',
  },
  required: {
    color: '#E74C3C',
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    fontFamily: 'Raleway-Regular',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 24,
  },
  nextButton: {
    backgroundColor: '#5591BC',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5591BC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 180,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
    marginRight: 6,
  },
  buttonIcon: {
    marginLeft: 4,
  },
  buttonIconBack: {
    marginRight: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  backButton: {
    borderWidth: 1,
    borderColor: '#5591BC',
    backgroundColor: 'rgba(85, 145, 188, 0.05)',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#5591BC',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
  },
  doneButton: {
    backgroundColor: '#5591BC',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5591BC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  doneButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Raleway-SemiBold',
  }
});

export default Scene03;