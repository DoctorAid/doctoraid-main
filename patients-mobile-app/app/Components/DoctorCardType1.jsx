// DoctorCardType1.js
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  TextInput, 
  Animated, 
  ScrollView, 
  Dimensions,
  Easing,
  Image
} from 'react-native';
import { ChevronRight, ChevronDown } from 'lucide-react-native';
import { Calendar, Clock } from "lucide-react-native";

// Extended appointments data
const appointments = [
  {
    id: '1',
    doctorName: 'Dr. Ruchitha Perera',
    patientName: 'Namal Dahanayaka',
    date: '04.03.2025',
    time: '11:00 AM - 12:00 PM',
  },
  {
    id: '2',
    doctorName: 'Dr. Chirasthi Dias',
    patientName: 'Namal Dahanayaka',
    date: '01.04.2025',
    time: '2:00 PM - 3:00 PM',
  },
  {
    id: '3',
    doctorName: 'Dr. Chirasthi Dias',
    patientName: 'Namal Dahanayaka',
    date: '21.05.2025',
    time: '9:30 AM - 10:30 AM',
  },
  {
    id: '4',
    doctorName: 'Dr. Jayampathy Dissanayaka',
    patientName: 'Namal Dahanayaka',
    date: '17.06.2025',
    time: '4:00 PM - 5:00 PM',
  },
];

const { width } = Dimensions.get('window');
const cardWidth = width * 0.8; // Card takes 80% of screen width

const DoctorCard = ({ doctorName, patientName, date, time, onPress, isExpanded, onPinSubmit }) => {
  const [pin, setPin] = useState("");
  const expandAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  // Doctor image URL
  const doctorImageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxNMPc0tFsIwbXWYrR_6VR9Whnt3O9ut-8fQ&s";
  
  React.useEffect(() => {
    if (isExpanded) {
      Animated.parallel([
        Animated.timing(expandAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.out(Easing.cubic)
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic)
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(expandAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.out(Easing.cubic)
        }),
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic)
        })
      ]).start();
    }
  }, [isExpanded, expandAnim, rotateAnim]);
  
  const pinContainerHeight = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 140]
  });
  
  const pinOpacity = expandAnim;
  
  const rotateIcon = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  });
  
  const handlePinSubmit = () => {
    if (pin.trim().length > 0) {
      onPinSubmit();
    } else {
      console.log("Please enter a valid PIN");
    }
  };
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.card,
        isExpanded && styles.expandedCard
      ]}
      activeOpacity={0.9}
    >
      <View style={styles.header}>  
        <Image 
          source={{ uri: doctorImageUrl }}
          style={styles.doctorImage}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.doctorName}>{doctorName}</Text>
          <Text style={styles.forPatient}>
            For <Text style={styles.patientName}>{patientName}</Text>
          </Text>
        </View>
        <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
          <ChevronDown size={20} color="white" />
        </Animated.View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Calendar size={14} color="#AFCDE7" />
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.row}>
          <Clock size={14} color="#AFCDE7" />
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>

      {/* PIN Entry Section with animation */}
      <Animated.View 
        style={[
          styles.pinEntryContainer,
          { 
            height: pinContainerHeight,
            opacity: pinOpacity,
            overflow: 'hidden'
          }
        ]}
      >
        <Text style={styles.pinEntryTitle}>Enter the pin number</Text>
        
        {/* PIN Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Enter Pin |"
          placeholderTextColor="#AFCDE7"
          secureTextEntry
          value={pin}
          onChangeText={setPin}
          keyboardType="number-pad"
        />
        
        {/* Enter Queue Button */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={handlePinSubmit}
        >
          <Text style={styles.buttonText}>Enter Queue</Text>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
};

const DoctorCardType1 = ({ onPress }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  
  const handleCardPress = (appointmentId, index) => {
    // If the card is already expanded, collapse it
    if (expandedCard === appointmentId) {
      setExpandedCard(null);
    } else {
      // Otherwise, expand it and center it in the scroll view
      setExpandedCard(appointmentId);
      setCurrentIndex(index);
      
      // Scroll to the selected card
      scrollViewRef.current?.scrollTo({
        x: index * (cardWidth + 15),
        animated: true
      });
    }
  };
  
  const handlePinSubmit = () => {
    // Move to the next step
    onPress();
  };
  
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (cardWidth + 15));
    setCurrentIndex(index);
    
    // Close expanded card when scrolling to a different card
    if (expandedCard !== null && index !== appointments.findIndex(app => app.id === expandedCard)) {
      setExpandedCard(null);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Your</Text>
        <Text style={styles.titleText}>Appointments</Text>
      </View>
      
      <ScrollView 
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
        snapToInterval={cardWidth + 15}
        decelerationRate="fast"
        onMomentumScrollEnd={handleScroll}
      >
        {appointments.map((item, index) => (
          <View key={item.id} style={styles.cardContainer}>
            <DoctorCard 
              doctorName={item.doctorName}
              patientName={item.patientName}
              date={item.date}
              time={item.time}
              onPress={() => handleCardPress(item.id, index)}
              isExpanded={expandedCard === item.id}
              onPinSubmit={handlePinSubmit}
            />
          </View>
        ))}
      </ScrollView>
      
      {/* Pagination Indicator */}
      <View style={styles.paginationContainer}>
        {appointments.map((_, index) => (
          <View 
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index ? styles.activeDot : {}
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  titleContainer: {
    marginBottom: 10,
  },
  titleText: {
    paddingHorizontal: 10,
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#265A69',
  },
  scrollContainer: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 20,
  },
  cardContainer: {
    width: cardWidth,
    marginRight: 15,
  },
  card: {
    backgroundColor: '#265A69', 
    padding: 16,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: "#AFCDE7",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 5,
  },
  expandedCard: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    elevation: 8,
    borderColor: "#d3e6f5",
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doctorImage: {
    width: 45, 
    height: 45, 
    borderRadius: 22.5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  doctorName: {
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold'
  },
  forPatient: {
    color: '#AFCDE7', 
    fontSize: 13
  },
  patientName: {
    fontWeight: 'bold',
    color: '#AFCDE7',
  },
  divider: {
    borderBottomWidth: 1, 
    borderBottomColor: '#AFCDE7', 
    marginVertical: 10
  },
  infoContainer: {
    marginTop: 5,
  },
  row: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 5
  },
  date: {
    color: '#AFCDE7', 
    fontSize: 13, 
    marginLeft: 8
  },
  time: {
    color: '#AFCDE7', 
    fontSize: 13, 
    marginLeft: 8
  },
  // Pin Entry styles
  pinEntryContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#AFCDE7',
    paddingTop: 12,
  },
  pinEntryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#AFCDE7",
    padding: 8,
    borderRadius: 8,
    color: "white",
    fontSize: 14,
    marginBottom: 12,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#AFCDE7",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    color: "#164A63",
    fontWeight: "bold",
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#AFCDE7',
    marginHorizontal: 3,
    opacity: 0.5,
  },
  activeDot: {
    backgroundColor: '#265A69',
    width: 16,
    height: 8,
    opacity: 1,
  },
});

export default DoctorCardType1;