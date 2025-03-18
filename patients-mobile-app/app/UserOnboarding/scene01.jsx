import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
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
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

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

  const animateTransition = (direction) => {
    // Fade out current content
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: direction === 'next' ? -100 : 100,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 200,
          useNativeDriver: true,
        })
      ]),
      Animated.timing(slideAnim, {
        toValue: direction === 'next' ? 100 : -100,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        })
      ])
    ]).start();
  };

  const handleNext = () => {
    if (currentScene < 2) {
      animateTransition('next');
      setTimeout(() => {
        setCurrentScene(currentScene + 1);
      }, 200);
    } else if (currentScene === 2) {
      // Apply a fade out animation before navigation
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        router.push('/UserOnboarding/scene03');
      });
    }
  };

  const handlePrevious = () => {
    if (currentScene > 1) {
      animateTransition('prev');
      setTimeout(() => {
        setCurrentScene(currentScene - 1);
      }, 200);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Fixed position content wrapper */}
        <View style={styles.contentWrapper}>
          {/* Heading & Subtitle section */}
          <Animated.View 
            style={[
              styles.textContainer,
              { 
                top: dimensions.height * 0.22,
                opacity: fadeAnim,
                transform: [
                  { translateX: slideAnim },
                  { scale: scaleAnim }
                ]
              }
            ]}
          >
            <Text style={styles.title}>
              {currentScene === 1 ? 'Connect With Your Doctor' : 'Family Health Management'}
            </Text>
            <Text style={styles.subtitle}>
              {currentScene === 1
                ? 'Browse Verified Doctors Based On Location, Specialty, Or Availability.'
                : 'Manage Your Family\'s Health And Access Prescriptions, Medical History, And Reports Anytime.'}
            </Text>
          </Animated.View>

          {/* Navigation Controls with consistent padding on both sides */}
          <View style={[
            styles.navigationContainer,
            { top: dimensions.height * 0.45 }
          ]}>
            <View style={styles.controlsWrapper}>
              {/* Left Arrow (visible only in Scene 2) */}
              <TouchableOpacity 
                style={[
                  styles.button, 
                  currentScene === 1 && styles.invisibleButton,
                  currentScene === 2 && styles.visibleButton
                ]} 
                onPress={handlePrevious}
                disabled={currentScene === 1}
              >
                <LeftArrowSVG width={30} height={30} />
              </TouchableOpacity>

              {/* Pagination Indicators */}
              <View style={styles.pagination}>
                <View style={[styles.line, currentScene === 1 && styles.activeLine]} />
                <View style={[styles.line, currentScene === 2 && styles.activeLine]} />
              </View>

              {/* Right Arrow */}
              <TouchableOpacity 
                style={[styles.button, styles.rightButton]} 
                onPress={handleNext}
              >
                <RightArrowSVG width={30} height={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* SVGs with position that respects dimensions */}
        <Animated.View 
          style={[
            styles.svgContainer,
            { 
              height: dimensions.height * 0.5,
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          {currentScene === 1 ? (
            <DoctorsSVG width="500px" height="500px" />
          ) : (
            <FamilySVG width="400px" height="400px" />
          )}
        </Animated.View>
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
    borderRadius: 1.5,
  },
  activeLine: {
    backgroundColor: '#295567',
    width: 32,
  },
  ikbutton: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  invisibleButton: {
    opacity: 0, 
  },
  visibleButton: {
    opacity: 1,
  },
  rightButton: {
  },
  svgContainer: {
    position: 'absolute',
    bottom: -80,
    width: '100%',
    alignItems: 'center',
  },
});

export default Scene01;