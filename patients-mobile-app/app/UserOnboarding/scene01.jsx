import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import DoctorsSVG from '../Assets/images/doctors.svg';
import FamilySVG from '../Assets/images/family.svg';
import RightArrowSVG from '../Assets/images/right-arrow.svg';
import LeftArrowSVG from '../Assets/images/left-arrow.svg';

const Scene01 = () => {
  const [currentScene, setCurrentScene] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    if (currentScene < 2) {
      setCurrentScene(currentScene + 1);
    } else if (currentScene === 2) {
      // Navigate to scene03 in the UserOnboarding directory
      router.push('/UserOnboarding/scene03');
    }
  };

  const handlePrevious = () => {
    if (currentScene > 1) {
      setCurrentScene(currentScene - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[
        styles.contentContainer,
        currentScene === 2 && styles.contentContainerScene2
      ]}>
        {/* Heading & Subtitle - Positioned lower than before */}
        <Text style={styles.title}>
          {currentScene === 1 ? 'Connect With Your Doctor' : 'Family Health Management'}
        </Text>
        <Text style={styles.subtitle}>
          {currentScene === 1
            ? 'Browse Verified Doctors Based On Location, Specialty, Or Availability.'
            : 'Manage Your Family\'s Health And Access Prescriptions, Medical History, And Reports Anytime.'}
        </Text>

        {/* Navigation Controls - Centered and positioned lower */}
        <View style={styles.navigationContainer}>
          {/* Left Arrow (visible only in Scene 2) */}
          {currentScene === 2 ? (
            <TouchableOpacity style={styles.button} onPress={handlePrevious}>
              <LeftArrowSVG width={30} height={30} />
            </TouchableOpacity>
          ) : (
            <View style={styles.buttonPlaceholder} />
          )}

          {/* Pagination Indicators - Centered between arrows */}
          <View style={styles.pagination}>
            <View style={[styles.line, currentScene === 1 && styles.activeLine]} />
            <View style={[styles.line, currentScene === 2 && styles.activeLine]} />
            <View style={styles.line} />
          </View>

          {/* Right Arrow - Always visible */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleNext}
          >
            <RightArrowSVG width={30} height={30} />
          </TouchableOpacity>
        </View>
      </View>

      {/* SVGs positioned to reach the bottom of the page */}
      <View style={styles.svgContainer}>
        {currentScene === 1 ? (
          <DoctorsSVG width="500px" height="500px" />
        ) : (
          <FamilySVG width="400px" height="400px" />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9E4F3',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    width: '100%',
    paddingTop: '25%', 
    zIndex: 1,
  },
  contentContainerScene2: {
    paddingTop: '20%', 
  },
  title: {
    fontSize: 48,
    fontFamily: 'Raleway-SemiBold',
    color: '#295567',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Raleway-Regular',
    color: '#6394B5',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 30, 
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  line: {
    width: 25,
    height: 3,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 5,
  },
  activeLine: {
    backgroundColor: '#295567',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  buttonPlaceholder: {
    width: 60,
    height: 60,
  },
  svgContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%', 
    marginBottom: -80, 
    alignItems: 'center',
  },
});

export default Scene01;