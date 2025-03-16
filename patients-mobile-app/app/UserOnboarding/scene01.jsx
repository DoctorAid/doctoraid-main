import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import DoctorsSVG from '../Assets/images/doctors.svg';
import FamilySVG from '../Assets/images/family.svg';
import RightArrowSVG from '../Assets/images/right-arrow.svg';
import LeftArrowSVG from '../Assets/images/left-arrow.svg';

const Scene01 = () => {
  // Use state to handle dimensions changes when orientation changes
  const [dimensions, setDimensions] = useState({
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  });

  const [currentScene, setCurrentScene] = useState(1);
  const router = useRouter();

  // Update dimensions when screen size changes (e.g., rotation)
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height
      });
    });

    return () => subscription?.remove();
  }, []);

  const handleNext = () => {
    if (currentScene < 2) {
      setCurrentScene(currentScene + 1);
    } else if (currentScene === 2) {
      router.push('/UserOnboarding/scene03');
    }
  };

  const handlePrevious = () => {
    if (currentScene > 1) {
      setCurrentScene(currentScene - 1);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Fixed position content wrapper */}
        <View style={styles.contentWrapper}>
          {/* Heading & Subtitle section */}
          <View style={[
            styles.textContainer,
            { top: dimensions.height * 0.22 }
          ]}>
            <Text style={styles.title}>
              {currentScene === 1 ? 'Connect With Your Doctor' : 'Family Health Management'}
            </Text>
            <Text style={styles.subtitle}>
              {currentScene === 1
                ? 'Browse Verified Doctors Based On Location, Specialty, Or Availability.'
                : 'Manage Your Family\'s Health And Access Prescriptions, Medical History, And Reports Anytime.'}
            </Text>
          </View>

          {/* Navigation Controls with consistent padding on both sides */}
          <View style={[
            styles.navigationContainer,
            { top: dimensions.height * 0.45 }
          ]}>
            <View style={styles.controlsWrapper}>
              {/* Left Arrow (visible only in Scene 2) */}
              <TouchableOpacity 
                style={[styles.button, currentScene === 1 && styles.invisibleButton]} 
                onPress={handlePrevious}
                disabled={currentScene === 1}
              >
                <LeftArrowSVG width={30} height={30} />
              </TouchableOpacity>

              {/* Pagination Indicators */}
              <View style={styles.pagination}>
                <View style={[styles.line, currentScene === 1 && styles.activeLine]} />
                <View style={[styles.line, currentScene === 2 && styles.activeLine]} />
                <View style={styles.line} />
              </View>

              {/* Right Arrow */}
              <TouchableOpacity 
                style={styles.button} 
                onPress={handleNext}
              >
                <RightArrowSVG width={30} height={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* SVGs with position that respects dimensions */}
        <View style={[
          styles.svgContainer,
          { height: dimensions.height * 0.5 }
        ]}>
          {currentScene === 1 ? (
            <DoctorsSVG width="500px" height="500px" />
          ) : (
            <FamilySVG width="400px" height="400px" />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#C9E4F3',
  },
  container: {
    flex: 1,
    backgroundColor: '#C9E4F3',
    position: 'relative',
    overflow: 'hidden',
  },
  contentWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  textContainer: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    paddingHorizontal: 20,
  },
  navigationContainer: {
    width: '100%',
    position: 'absolute',
    paddingHorizontal: 40, 
  },
  controlsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
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
  },
  invisibleButton: {
    opacity: 0, 
  },
  svgContainer: {
    position: 'absolute',
    bottom: -80,
    width: '100%',
    alignItems: 'center',
  },
});

export default Scene01;