import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Modal, 
  Alert,
  Animated,
  Dimensions,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import UserSwitch from './UserSwitch';
import AppointmentNote from './AppointmentNote';
import BookingSection from './BookingSection';

const { width } = Dimensions.get('window');

export default function AppointmentScreen({ doctor, onBack }) {
  const [isSubscribed, setIsSubscribed] = useState(doctor.subscribed);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [appointmentNote, setAppointmentNote] = useState('');
  const [bookingDetails, setBookingDetails] = useState(null);
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const modalSlideAnim = useRef(new Animated.Value(300)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const actionButtonsAnim = useRef(new Animated.Value(0)).current;
  const doctorInfoAnim = useRef(new Animated.Value(0)).current;
  const errorFadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Sample family profiles
  const familyProfiles = [
    {
      id: '1',
      name: 'Namal Dahanayake',
      relation: 'Father',
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgFBQkGBxYIBwYGBw8ICQgWIBEiIiAdHx8YHSggGCYlGx8fITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwIBB//EADEQAQACAQIDBQYFBQAAAAAAAAABAgMEEgURIiEyQlJxEyMxUVNiQXKBkcEzYWNz0f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9bAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHm960pNrzWta13WtZSa7id8szTBNsOPu7vFYFpqNfp9Pzi991vp4+qyDfjUR/Tw7v8AZdUALWONX59WHHy+26Vp+K4MsxW+7Ba31O7+6gAa74jM4NdqMHKKZLWr9O3VVdaHXU1VeU+7yV72PzegJgAAAAAAAAAAAAAAAAI+vzew0uS8T1bdtfWQVXFtZObJOGk+7xW6tvilXAAAAAA9UvalovSbVtXqraryA0fD9XGqw8521yU6b1/lLZjQ6idNqKX59Pdv6NPE845wAAAAAAAAAAAAAAAq+O35YcdPNfd+y0VHHufPD8u0FQAAAAAAAA0+hvN9HitPx2Mw0vDqzXRYonybgSQAAAAAAAAAAAAAFbxyk209LxH9K/V+qyQeL5JporREbva22flBnwAAAAAAAeqV32rWPFba1VKxStaR8KV2spEzExMTtmrR8Nve+jx2yza1rc+q3yBKAAAAAAAAAAAAAAcNZhjUafJSY7du6vq7gMlMcpmJ+NXxO4pprYM83iPd57bq2/v8kEAAAAAH2Im0xERum3drUHTTYbajPTHX42t1W8sNRWsUrWsfCtdtVbwnQ3wzOXL02tXbXH5YWYAAAAAAAAAAAAAAAAOebHXNjtjvG6L12/lZnNjthy2x3jtpba1Sp43p+da56x216L/wCnAAAAWnBNPFsls1o7MXTT1VbQcHrt0VZ89psCcAAAAAAAAAAAAAAAAAAj8RrFtFlifJuSFfxnNFNN7OJ6s9tv6AoQAAAGh4ReLaKkeS01szyz4LqIplthtPZl6qeoLsAAAAAAAAAAAAAAAAR82s0+Hv5MfPy16rK/U8YtbnXT02/wCTJ/wFjqtTj01N2Se3w4/FZntTqL6nLN7+Lu18sOeS98lpvktbJa3is8gAAAAPtZmtotWds16q2fAF/wAP19NRSKXmtMte9XzJ7JRMxPOJ2ystHxW9OVNRFstfDkr3qguxzw5seeu7FeuSPtdAAAAAAAAAHy1orWbWmtYr3rWecuSmKlr5Lba171lBrtdk1NpiN2PHXu4/N6gmavi0Vmaaatck/Vt3Vbl1ObNMzkyXt9u7pcQAAAAAAAAAAAAHql70tFqWtjmvirZPwcXy05RmrXPHm7tlcA0en4hp8/ZF/ZW+nk6UtkU3R8Qy6a0VtNsuP6dvD6A0I54ctM+OMmO26tnQAAAEDi+onDp9lZ22z9P6fiCu4prJ1OXZSfd4rdP3T80EAAAAAAAAAAAAAAAAAAAS+H6u2my9u62O/fr/AC0UTFqxaJ3RbqrZkl5wXUTfDbFad04O76AsgAFBxrJu1ez8MVIqAIAAAAAAAAAAAAAAAAAAAACXwvN7HWU5z05eiwA0YAP/2Q=='
    },
    {
      id: '2',
      name: 'Chanidu Dahanayake',
      relation: 'Son',
      image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgFBQkGBxYIBwYGBw8ICQgWIBEiIiAdHx8YHSggGCYlGx8fITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAbAAEAAwEBAQEAAAAAAAAAAAAABAUGAwIBB//EADEQAQACAQIDBQYFBQAAAAAAAAABAgMEEgURIiEyQlJxEyMxUVNiQXKBkcEzYWNz0f/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD9bAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHm960pNrzWta13WtZSa7id8szTBNsOPu7vFYFpqNfp9Pzi991vp4+qyDfjUR/Tw7v8AZdUALWONX59WHHy+26Vp+K4MsxW+7Ba31O7+6gAa74jM4NdqMHKKZLWr9O3VVdaHXU1VeU+7yV72PzegJgAAAAAAAAAAAAAAAAI+vzew0uS8T1bdtfWQVXFtZObJOGk+7xW6tvilXAAAAAA9UvalovSbVtXqraryA0fD9XGqw8521yU6b1/lLZjQ6idNqKX59Pdv6NPE845wAAAAAAAAAAAAAAAq+O35YcdPNfd+y0VHHufPD8u0FQAAAAAAAA0+hvN9HitPx2Mw0vDqzXRYonybgSQAAAAAAAAAAAAAFbxyk209LxH9K/V+qyQeL5JporREbva22flBnwAAAAAAAeqV32rWPFba1VKxStaR8KV2spEzExMTtmrR8Nve+jx2yza1rc+q3yBKAAAAAAAAAAAAAAcNZhjUafJSY7du6vq7gMlMcpmJ+NXxO4pprYM83iPd57bq2/v8kEAAAAAH2Im0xERum3drUHTTYbajPTHX42t1W8sNRWsUrWsfCtdtVbwnQ3wzOXL02tXbXH5YWYAAAAAAAAAAAAAAAAOebHXNjtjvG6L12/lZnNjthy2x3jtpba1Sp43p+da56x216L/wCnAAAAWnBNPFsls1o7MXTT1VbQcHrt0VZ89psCcAAAAAAAAAAAAAAAAAAj8RrFtFlifJuSFfxnNFNN7OJ6s9tv6AoQAAAGh4ReLaKkeS01szyz4LqIplthtPZl6qeoLsAAAAAAAAAAAAAAAAR82s0+Hv5MfPy16rK/U8YtbnXT02/wCTJ/wFjqtTj01N2Se3w4/FZntTqL6nLN7+Lu18sOeS98lpvktbJa3is8gAAAAPtZmtotWds16q2fAF/wAP19NRSKXmtMte9XzJ7JRMxPOJ2ystHxW9OVNRFstfDkr3qguxzw5seeu7FeuSPtdAAAAAAAAAHy1orWbWmtYr3rWecuSmKlr5Lba171lBrtdk1NpiN2PHXu4/N6gmavi0Vmaaatck/Vt3Vbl1ObNMzkyXt9u7pcQAAAAAAAAAAAAHql70tFqWtjmvirZPwcXy05RmrXPHm7tlcA0en4hp8/ZF/ZW+nk6UtkU3R8Qy6a0VtNsuP6dvD6A0I54ctM+OMmO26tnQAAAEDi+onDp9lZ22z9P6fiCu4prJ1OXZSfd4rdP3T80EAAAAAAAAAAAAAAAAAAAS+H6u2my9u62O/fr/AC0UTFqxaJ3RbqrZkl5wXUTfDbFad04O76AsgAFBxrJu1ez8MVIqAIAAAAAAAAAAAAAAAAAAAACXwvN7HWU5z05eiwA0YAP/2Q=='
    },
  ];
  
  const [selectedProfile, setSelectedProfile] = useState(familyProfiles[0]);
  
  useEffect(() => {
    // Initial animations when screen loads
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(doctorInfoAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.stagger(100, [
        Animated.timing(actionButtonsAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);
  
  useEffect(() => {
    // Animation for modal appearance/disappearance
    if (showBookingModal) {
      Animated.spring(modalSlideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(modalSlideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showBookingModal]);
  
  const toggleSubscription = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    setIsSubscribed(!isSubscribed);
  };

  const handleGoBack = () => {
    // Fade out animation before going back
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onBack();
    });
  };
  
  const handleBookingComplete = (details) => {
    setBookingDetails(details);
    setShowBookingModal(true);
  };
  
  const handleCloseModal = () => {
    setShowBookingModal(false);
  };
  
  const handleProfileChange = (profile) => {
    setSelectedProfile(profile);
  };
  
  const handleNoteChange = (text) => {
    setAppointmentNote(text);
  };
  
  const handleBookNow = () => {
    // Button press animation
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Create appointment object
    const appointment = {
      doctorId: doctor.id,
      doctorName: doctor.name,
      patientId: selectedProfile.id,
      patientName: selectedProfile.name,
      patientRelation: selectedProfile.relation,
      note: appointmentNote,
      date: bookingDetails.date,
      time: bookingDetails.time,
      session: bookingDetails.session.name
    };
    
    console.log('Booking appointment:', appointment);
    
    // Close modal with animation
    setShowBookingModal(false);
    
    // Show success message after a slight delay to let modal close animation finish
    setTimeout(() => {
      Alert.alert(
        "Appointment Booked",
        `Your appointment with ${doctor.name} has been scheduled for ${bookingDetails.date} at ${bookingDetails.time} (${bookingDetails.session.name}).`,
        [{ text: "OK", onPress: () => onBack() }]
      );
    }, 300);
  };

  // Action button animation styles
  const actionButtonStyle = index => {
    return {
      opacity: actionButtonsAnim,
      transform: [
        { scale: actionButtonsAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1]
        }) },
        { translateY: actionButtonsAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0]
        }) }
      ],
    };
  };

  // Header background opacity based on scroll position
  const headerBackgroundOpacity = scrollY.interpolate({
    inputRange: [0, 40, 80],
    outputRange: [0, 0.5, 1],
    extrapolate: 'clamp'
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Simplified Header */}
      <Animated.View style={[
        styles.headerContainer,
        { backgroundColor: scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
            extrapolate: 'clamp'
          })
        }
      ]}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={24} color="#334155" />
        </TouchableOpacity>
      </Animated.View>
      
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <Animated.ScrollView 
          style={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
        >
          <View style={styles.content}>
            {/* Doctor Profile Card */}
            <Animated.View 
              style={[
                styles.doctorCard,
                { 
                  opacity: doctorInfoAnim,
                  transform: [
                    { translateY: doctorInfoAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0]
                    }) }
                  ]
                }
              ]}
            >
              {/* Top section with image, name and badge */}
              <View style={styles.doctorHeader}>
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&auto=format&fit=crop&q=60' }}
                  style={styles.doctorImageLarge}
                />
                <View style={styles.doctorHeaderOverlay}>
                  <View style={styles.doctorNameRow}>
                    <Text style={styles.doctorNameLarge}>{doctor.name}</Text>
                    {isSubscribed && (
                      <View style={styles.subBadgeNew}>
                        <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                      </View>
                    )}
                  </View>
                </View>
              </View>
              
              {/* Info section */}
              <View style={styles.doctorInfoDetails}>
                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={16} color="#64748B" />
                  <Text style={styles.infoText}>{doctor.location}</Text>
                </View>
        
              </View>
              
              {/* Action Buttons */}
              <View style={styles.actionsNew}>
                <Animated.View style={actionButtonStyle(0)}>
                  <TouchableOpacity style={styles.actionButtonNew}>
                    <Ionicons name="call" size={20} color="#295567" />
                    <Text style={styles.actionButtonText}>Call</Text>
                  </TouchableOpacity>
                </Animated.View>
                
                <Animated.View style={actionButtonStyle(1)}>
                  <TouchableOpacity style={styles.actionButtonNew}>
                    <Ionicons name="location" size={20} color="#295567" />
                    <Text style={styles.actionButtonText}>Location</Text>
                  </TouchableOpacity>
                </Animated.View>
                
                <Animated.View 
                  style={[
                    actionButtonStyle(2),
                    { transform: [{ scale: buttonScaleAnim }] }
                  ]}
                >
                  <TouchableOpacity 
                    style={[styles.actionButtonNew, isSubscribed && styles.subscribedButtonNew]}
                    onPress={toggleSubscription}
                  >
                    <Ionicons 
                      name={isSubscribed ? "notifications" : "notifications-outline"} 
                      size={20} 
                      color="#295567" 
                    />
                    <Text style={styles.actionButtonText}>
                      {isSubscribed ? "Subscribed" : "Subscribe"}
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              </View>
            </Animated.View>

            <Animated.View 
              style={[
                styles.section,
                { 
                  opacity: fadeAnim,
                  transform: [
                    { translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0]
                    }) }
                  ]
                }
              ]}
            >
              <Text style={styles.sectionTitle}>About Doctor</Text>
              <Text style={styles.description}>
                Dr. Ruchitha Perera is a specialist cardiologist with over 15 years of experience in treating heart conditions. he completed her medical education at Peradeniya University.
              </Text>
            </Animated.View>

            {/* New Booking Section */}
            <BookingSection 
              onBookingComplete={handleBookingComplete}
              fadeAnim={fadeAnim}
              buttonScaleAnim={buttonScaleAnim}
            />
          </View>
        </Animated.ScrollView>
      </Animated.View>
      
      {/* Booking Modal */}
      <Modal
        visible={showBookingModal}
        animationType="none"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <Animated.View 
            style={[
              styles.modalContent,
              { 
                transform: [{ translateY: modalSlideAnim }]
              }
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Book Appointment</Text>
              <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                <Ionicons name="close" size={22} color="#334155" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <Animated.View 
                style={[
                  styles.appointmentDetails,
                  { 
                    opacity: fadeAnim,
                    transform: [
                      { translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0]
                      }) }
                    ]
                  }
                ]}
              >
                <View style={styles.detailRow}>
                  <View style={styles.detailIconContainer}>
                    <Ionicons name="person" size={18} color="#295567" />
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailsLabel}>Doctor</Text>
                    <Text style={styles.detailsValue}>{doctor.name}</Text>
                  </View>
                </View>
                
                <View style={styles.detailRow}>
                  <View style={styles.detailIconContainer}>
                    <Ionicons name="calendar" size={18} color="#295567" />
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailsLabel}>Date</Text>
                    <Text style={styles.detailsValue}>
                      {bookingDetails ? bookingDetails.date : 'Not selected'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.detailRow}>
                  <View style={styles.detailIconContainer}>
                    <Ionicons name="time" size={18} color="#295567" />
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailsLabel}>Time</Text>
                    <Text style={styles.detailsValue}>
                      {bookingDetails ? bookingDetails.time : 'Not selected'}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.detailRow}>
                  <View style={styles.detailIconContainer}>
                    <Ionicons name="medical" size={18} color="#295567" />
                  </View>
                  <View style={styles.detailTextContainer}>
                    <Text style={styles.detailsLabel}>Session</Text>
                    <Text style={styles.detailsValue}>
                      {bookingDetails ? `${bookingDetails.session.name} (${bookingDetails.session.startTime} - ${bookingDetails.session.endTime})` : 'Not selected'}
                    </Text>
                  </View>
                </View>
              </Animated.View>
              
              {/* Family Profile Selection */}
              <Animated.View 
                style={[
                  styles.profileSelectionContainer,
                  { 
                    opacity: fadeAnim,
                    transform: [
                      { translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0]
                      }) }
                    ]
                  }
                ]}
              >
                <Text style={styles.modalSectionTitle}>Select Patient</Text>
                <UserSwitch 
                  profiles={familyProfiles}
                  selectedProfile={selectedProfile}
                  onProfileChange={handleProfileChange}
                />
              </Animated.View>
              
              {/* Note Input */}
              <Animated.View 
                style={[
                  styles.noteContainer,
                  { 
                    opacity: fadeAnim,
                    transform: [
                      { translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0]
                      }) }
                    ]
                  }
                ]}
              >
                <Text style={styles.modalSectionTitle}>Add Note (Optional)</Text>
                <AppointmentNote 
                  onNoteChange={handleNoteChange}
                  initialNote={appointmentNote}
                />
              </Animated.View>
            </ScrollView>
            
            <View style={styles.modalFooter}>
              <Animated.View style={{ transform: [{ scale: buttonScaleAnim }], flex: 1 }}>
                <TouchableOpacity 
                  style={styles.bookNowButton}
                  onPress={handleBookNow}
                  activeOpacity={0.9}
                >
                  <Text style={styles.bookNowButtonText}>Confirm Booking</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FEFAF6',
  },
  container: {
    flex: 1,
    backgroundColor: '#FEFAF6',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70, // Reduced padding to account for simpler header
    paddingBottom: 30,
  },
  // Simplified Header
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    zIndex: 1000,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  // Doctor Card Styles
  doctorCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  doctorHeader: {
    position: 'relative',
    height: 150,
  },
  doctorImageLarge: {
    width: '100%',
    height: '100%',
  },
  doctorHeaderOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  doctorNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doctorNameLarge: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  subBadgeNew: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(41, 85, 103, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 12,
  },
  
  doctorInfoDetails: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
  },
  actionsNew: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 12,
  },
  actionButtonNew: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    minWidth: 90,
  },
  subscribedButtonNew: {
    backgroundColor: '#E6F4F1',
    borderWidth: 1,
    borderColor: '#295567',
  },
  actionButtonText: {
    color: '#295567',
    fontWeight: '500',
    fontSize: 12,
    marginTop: 4,
  },
  // About Section
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#64748B',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    padding: 20,
    maxHeight: '60%',
  },
  modalFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  // Appointment Details
  appointmentDetails: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#E6F4F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailsLabel: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 2,
  },
  detailsValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
  },
  // Profile Selection
  profileSelectionContainer: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 12,
  },
  // Note Container
  noteContainer: {
    marginBottom: 20,
  },
  // Booking
  bookNowButton: {
    backgroundColor: '#295567',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  bookNowButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  }
});