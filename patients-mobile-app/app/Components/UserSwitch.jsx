import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Image, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Dimensions,
  Animated,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const UserSwitch = ({ profiles, selectedProfile, onProfileChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownHeight, setDropdownHeight] = useState(0);
    const windowHeight = Dimensions.get('window').height;
    
    // Animation values
    const dropdownAnimation = useRef(new Animated.Value(0)).current;
    const rotateAnimation = useRef(new Animated.Value(0)).current;
    
    // Calculate dropdown height based on number of profiles
    useEffect(() => {
        // Each item is approximately 64px tall (height + padding)
        // Set maximum height to 40% of screen height
        const calculatedHeight = Math.min(profiles.length * 64, windowHeight * 0.4);
        setDropdownHeight(calculatedHeight);
    }, [profiles, windowHeight]);
    
    // Handle animations when dropdown opens/closes
    useEffect(() => {
        // Configure the next layout animation
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        
        // Animate dropdown
        Animated.timing(dropdownAnimation, {
            toValue: isOpen ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
        
        // Animate arrow rotation
        Animated.timing(rotateAnimation, {
            toValue: isOpen ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isOpen]);
    
    // Calculate arrow rotation based on animation value
    const arrowRotation = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    });
    
    // Calculate dropdown opacity and maxHeight based on animation value
    const dropdownOpacity = dropdownAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
    });
    
    const dropdownMaxHeight = dropdownAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, dropdownHeight]
    });
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    
    const selectProfile = (profile) => {
        // Only animate if we're selecting a different profile
        if (selectedProfile.id !== profile.id) {
            // Configure a spring animation for profile switch
            LayoutAnimation.configureNext({
                duration: 400,
                create: {
                    type: LayoutAnimation.Types.spring,
                    property: LayoutAnimation.Properties.scaleXY,
                    springDamping: 0.7,
                },
                update: {
                    type: LayoutAnimation.Types.spring,
                    springDamping: 0.7,
                },
            });
            
            onProfileChange(profile);
        }
        
        setIsOpen(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Family Profile</Text>
            <View style={styles.selectedProfileContainer}>
                <TouchableOpacity 
                    onPress={toggleDropdown} 
                    style={styles.selectedProfile}
                    activeOpacity={0.8}
                >
                    <View style={styles.imageContainer}>
                        <Image 
                            source={{ uri: selectedProfile.image }} 
                            style={styles.profileImage} 
                        />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.name}>{selectedProfile.name}</Text>
                        <Text style={styles.relation}>{selectedProfile.relation}</Text>
                    </View>
                    <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
                        <Feather 
                            name="chevron-down" 
                            size={20} 
                            color="#2C4157" 
                            style={styles.arrow}
                        />
                    </Animated.View>
                </TouchableOpacity>
            </View>

            <Animated.View 
                style={[
                    styles.dropdown, 
                    { 
                        opacity: dropdownOpacity,
                        maxHeight: dropdownMaxHeight,
                        display: dropdownMaxHeight._value === 0 ? 'none' : 'flex'
                    }
                ]}
            >
                <ScrollView 
                    showsVerticalScrollIndicator={true}
                    bounces={false}
                    contentContainerStyle={styles.dropdownScrollContent}
                >
                    {profiles.map((profile) => (
                        <TouchableOpacity 
                            key={profile.id} 
                            onPress={() => selectProfile(profile)} 
                            style={[
                                styles.dropdownItem,
                                selectedProfile.id === profile.id && styles.selectedItem
                            ]}
                            activeOpacity={0.7}
                        >
                            <View style={styles.dropdownImageContainer}>
                                <Image source={{ uri: profile.image }} style={styles.dropdownImage} />
                            </View>
                            <View style={styles.dropdownInfo}>
                                <Text style={styles.dropdownName}>{profile.name}</Text>
                                <Text style={styles.dropdownRelation}>{profile.relation}</Text>
                            </View>
                            {selectedProfile.id === profile.id && (
                                <Feather name="check" size={18} color="#2ecc71" style={styles.checkIcon} />
                            )}
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        width: '90%',
        alignSelf: 'center',
        marginBottom: 10,
        zIndex: 10, // Ensure dropdown appears above other content
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#2C4157',
        marginBottom: 20
    },
    selectedProfileContainer: {
        position: 'relative',
    },
    selectedProfile: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 15,
        backgroundColor: '#E8F1F9', 
        borderRadius: 12
    },
    imageContainer: {
        position: 'relative',
        marginRight: 12
    },
    profileImage: { 
        width: 50, 
        height: 50, 
        borderRadius: 25,
    },
    profileInfo: { 
        flex: 1, 
        flexDirection: 'column' 
    },
    name: { 
        fontSize: 18, 
        fontWeight: '600', 
        color: '#2C4157'
    },
    relation: { 
        fontSize: 16, 
        color: '#6B7C8F'
    },
    arrow: { 
        padding: 5 
    },
    dropdown: { 
        marginTop: 5, 
        backgroundColor: 'white', 
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    dropdownScrollContent: {
        flexGrow: 1,
    },
    dropdownItem: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 12,
        borderBottomWidth: 1, 
        borderBottomColor: '#E8F1F9'
    },
    selectedItem: {
        backgroundColor: '#F5F9FC'
    },
    dropdownImageContainer: {
        position: 'relative',
        marginRight: 10
    },
    dropdownImage: { 
        width: 40, 
        height: 40, 
        borderRadius: 20,
    },
    dropdownInfo: { 
        flex: 1, 
        flexDirection: 'column' 
    },
    dropdownName: { 
        fontSize: 16, 
        fontWeight: '600', 
        color: '#2C4157'
    },
    dropdownRelation: { 
        fontSize: 14, 
        color: '#6B7C8F'
    },
    checkIcon: {
        marginLeft: 5
    }
});

export default UserSwitch;