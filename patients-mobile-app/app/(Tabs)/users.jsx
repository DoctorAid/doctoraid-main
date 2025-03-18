// UserProfile.js - Main component
import React, { useState, useRef } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Text, Alert } from 'react-native';
import FamPic from '../Assets/images/fam.svg';
import MaxProfilesPopup from '../Components/MaxProfilesPopup';
import ProfileHeader from '../Components/ProfileHeader';
import UserProfInfo from '../Components/UserProfInfo';
import AddProfileModal from '../Components/ProfileModal';
import ImagePickerModal from '../Components/ImagePickerModal';
import RelationDropdown from '../Components/Users_RelationDropdown';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

const UserProfile = () => {
    // Profile state
    const [profiles, setProfiles] = useState([
        {
            id: 1,
            name: 'Nimesha Dahanayake',
            relation: 'Daughter',
            birthDate: '10.02.2014',
            age: '10 years',
            weight: '50kg',
            height: "5'3",
            gender: 'Female',
            image: 'https://i.pravatar.cc/100?img=1',
            allergies: ['Peanuts', 'Shellfish'],
            bloodType: 'A+'
        },
        {
            id: 2,
            name: 'John Smith',
            relation: 'Son',
            birthDate: '12.05.2016',
            age: '8 years',
            weight: '40kg',
            height: "4'8",
            gender: 'Male',
            image: 'https://i.pravatar.cc/100?img=2',
            allergies: [],
            bloodType: 'O+'
        }
    ]);
    
    // UI state
    const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [maxProfilesPopupVisible, setMaxProfilesPopupVisible] = useState(false);
    const [imagePickerVisible, setImagePickerVisible] = useState(false);
    const [currentProfileForImage, setCurrentProfileForImage] = useState(null);
    
    // New profile state
    const [newProfile, setNewProfile] = useState({
        name: '',
        relation: '',
        birthDate: '',
        age: '',
        weight: '',
        height: '',
        gender: '',
        allergies: [],
        bloodType: '',
        image: 'https://i.pravatar.cc/100?img=20', // Default image
    });
    const [allergyInput, setAllergyInput] = useState('');
    
    // References
    const modalScrollViewRef = useRef(null);
    
    // Add window dimensions
    const windowHeight = Dimensions.get('window').height;
    
    // Authentication and navigation
    const { signOut, isLoaded } = useAuth();
    const router = useRouter();

    // Profile management functions
    const handleProfileUpdate = (updatedProfile) => {
        const updatedProfiles = profiles.map(p => 
            p.id === updatedProfile.id ? updatedProfile : p
        );
        setProfiles(updatedProfiles);
        setSelectedProfile(updatedProfile);
    };

    const handleProfileChange = (profile) => {
        setSelectedProfile(profile);
    };

    const addProfile = () => {
        // Validate required fields
        if (!newProfile.name || !newProfile.relation) {
            Alert.alert('Error', 'Name and relation are required fields.');
            return;
        }

        if (profiles.length >= 5) {
            setMaxProfilesPopupVisible(true);
            return;
        }

        const newId = Math.max(...profiles.map(p => p.id), 0) + 1;
        const profileToAdd = {
            ...newProfile,
            id: newId,
        };

        const updatedProfiles = [...profiles, profileToAdd];
        setProfiles(updatedProfiles);
        setSelectedProfile(profileToAdd);
        resetNewProfileForm();
        setAddModalVisible(false);
    };

    const removeProfile = (profileId) => {
        if (profiles.length <= 1) {
            Alert.alert('Cannot Remove', 'You must have at least one profile.');
            return;
        }

        // Confirm deletion
        Alert.alert(
            'Confirm Removal',
            'Are you sure you want to remove this profile?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Remove',
                    onPress: () => {
                        const updatedProfiles = profiles.filter(p => p.id !== profileId);
                        setProfiles(updatedProfiles);
                        
                        // If the removed profile was selected, select the first one
                        if (selectedProfile.id === profileId) {
                            setSelectedProfile(updatedProfiles[0]);
                        }
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    // Form management functions
    const resetNewProfileForm = () => {
        setNewProfile({
            name: '',
            relation: '',
            birthDate: '',
            age: '',
            weight: '',
            height: '',
            gender: '',
            allergies: [],
            bloodType: '',
            image: 'https://i.pravatar.cc/100?img=20', // Default image
        });
        setAllergyInput('');
        
        // Reset modal scroll position when form is reset
        if (modalScrollViewRef.current) {
            modalScrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
        }
    };

    const addAllergy = () => {
        if (allergyInput.trim()) {
            setNewProfile({
                ...newProfile,
                allergies: [...newProfile.allergies, allergyInput.trim()]
            });
            setAllergyInput('');
        }
    };

    const removeAllergy = (index) => {
        const updatedAllergies = [...newProfile.allergies];
        updatedAllergies.splice(index, 1);
        setNewProfile({
            ...newProfile,
            allergies: updatedAllergies
        });
    };

    // Image handling functions
    const openImagePicker = async (isNewProfile = false, profileId = null) => {
        // Ask for permission
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
            Alert.alert('Permission Required', 'You need to allow access to your photos to change profile picture.');
            return;
        }

        // Set which profile we're changing the image for
        if (isNewProfile) {
            setCurrentProfileForImage(null); // For new profile
        } else {
            setCurrentProfileForImage(profileId); // For existing profile
        }
        
        setImagePickerVisible(true);
    };

    const takePhoto = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        
        if (permissionResult.granted === false) {
            Alert.alert('Permission Required', 'You need to allow access to your camera to take a photo.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            handleImageSelected(result.assets[0].uri);
        }
        
        setImagePickerVisible(false);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            handleImageSelected(result.assets[0].uri);
        }
        
        setImagePickerVisible(false);
    };

    const handleImageSelected = (imageUri) => {
        if (currentProfileForImage === null) {
            // For new profile
            setNewProfile({
                ...newProfile,
                image: imageUri
            });
        } else {
            // For existing profile
            const updatedProfiles = profiles.map(p => 
                p.id === currentProfileForImage ? {...p, image: imageUri} : p
            );
            setProfiles(updatedProfiles);
            
            // Update selected profile if it's the one being modified
            if (selectedProfile.id === currentProfileForImage) {
                setSelectedProfile({...selectedProfile, image: imageUri});
            }
        }
    };

    const changeProfilePicture = (profileId) => {
        openImagePicker(false, profileId);
    };

    // UI rendering handlers
    const handleAddButtonClick = () => {
        if (profiles.length >= 5) {
            setMaxProfilesPopupVisible(true);
        } else {
            setAddModalVisible(true);
        }
    };

    const closeAddModal = () => {
        setAddModalVisible(false);
        resetNewProfileForm();
    };

    // Fixed logout handler
    const handleLogout = async () => {
        if (!isLoaded) {
            return;
        }
    
        try {
            await signOut();
            
            // Navigate to sign-in screen
            router.replace('/(auth)/Sign-in');
        } catch (error) {
            console.error('Error signing out:', error);
            Alert.alert(
                'Logout Failed',
                'There was a problem logging you out. Please try again.'
            );
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <ProfileHeader 
                        profiles={profiles}
                        selectedProfile={selectedProfile}
                        onProfileChange={handleProfileChange}
                        onAddProfile={handleAddButtonClick}
                        onRemoveProfile={removeProfile}
                    />
                    <UserProfInfo 
                        profile={selectedProfile} 
                        onUpdateProfile={handleProfileUpdate}
                        onChangeImage={changeProfilePicture}
                    />
                </View>
                <View style={styles.svgContainer}>
                    <FamPic width={300} />
                </View>
            </ScrollView>

            {/* Modals */}
            <AddProfileModal 
                visible={addModalVisible}
                newProfile={newProfile}
                allergyInput={allergyInput}
                windowHeight={windowHeight}
                modalScrollViewRef={modalScrollViewRef}
                onClose={closeAddModal}
                onProfileChange={(profile) => setNewProfile(profile)}
                onAllergyInputChange={setAllergyInput}
                onAddAllergy={addAllergy}
                onRemoveAllergy={removeAllergy}
                onSave={addProfile}
                onImagePickerOpen={() => openImagePicker(true)}
            />

            <ImagePickerModal 
                visible={imagePickerVisible}
                onClose={() => setImagePickerVisible(false)}
                onTakePhoto={takePhoto}
                onPickImage={pickImage}
            />

            <MaxProfilesPopup 
                visible={maxProfilesPopupVisible}
                onClose={() => setMaxProfilesPopupVisible(false)}
            />

            <TouchableOpacity
                style={styles.logoutButton}
                onPress={handleLogout}
                disabled={!isLoaded}
            >
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FEFAF6',
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
    },
    container: {
        backgroundColor: '#FEFAF6',
    },
    svgContainer: {
        alignItems: 'center',
        marginBottom: -45,
        zIndex: 1, // Lower than dropdown
    },
    logoutButton: {
        backgroundColor: '#f44336',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default UserProfile;