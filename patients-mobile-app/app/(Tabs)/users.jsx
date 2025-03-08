import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Text, Modal, TextInput, Alert, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import UserSwitch from '../Components/UserSwitch';
import UserProfInfo from '../Components/UserProfInfo';
import FamPic from '../Assets/images/fam.svg';

const UserProfile = () => {
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
    
    const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
    const [addModalVisible, setAddModalVisible] = useState(false);
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
    const [imagePickerVisible, setImagePickerVisible] = useState(false);
    const [currentProfileForImage, setCurrentProfileForImage] = useState(null);

    const handleProfileUpdate = (updatedProfile) => {
        // Update the profile in the profiles array
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
            Alert.alert('Maximum Reached', 'You can only have up to 5 profiles.');
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

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <UserSwitch 
                            profiles={profiles} 
                            selectedProfile={selectedProfile}
                            onProfileChange={handleProfileChange}
                            // Removed onChangeImage prop from here as per updated code
                        />
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity 
                                style={[styles.actionButton, styles.addButton]} 
                                onPress={() => setAddModalVisible(true)}
                                disabled={profiles.length >= 5}
                            >
                                <Feather name="user-plus" size={18} color="#FFFFFF" />
                                <Text style={styles.buttonText}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.actionButton, styles.removeButton]}
                                onPress={() => removeProfile(selectedProfile.id)}
                                disabled={profiles.length <= 1}
                            >
                                <Feather name="user-minus" size={18} color="#FFFFFF" />
                                <Text style={styles.buttonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <UserProfInfo 
                        profile={selectedProfile} 
                        onUpdateProfile={handleProfileUpdate}
                        onChangeImage={changeProfilePicture} // Added onChangeImage prop here as per updated code
                    />
                </View>
                <View style={styles.svgContainer}>
                    <FamPic width={300} />
                </View>
            </ScrollView>

            {/* Add Profile Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={addModalVisible}
                onRequestClose={() => {
                    setAddModalVisible(false);
                    resetNewProfileForm();
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Add New Profile</Text>
                            <TouchableOpacity 
                                onPress={() => {
                                    setAddModalVisible(false);
                                    resetNewProfileForm();
                                }}
                            >
                                <Feather name="x" size={24} color="#2C4157" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.modalForm}>
                            {/* Profile Picture Selection */}
                            <View style={styles.profileImageContainer}>
                                <Image 
                                    source={{ uri: newProfile.image }} 
                                    style={styles.profileImagePreview} 
                                />
                                <TouchableOpacity 
                                    style={styles.changeImageButton}
                                    onPress={() => openImagePicker(true)}
                                >
                                    <Feather name="camera" size={16} color="#FFFFFF" />
                                    <Text style={styles.changeImageText}>Change Picture</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.inputLabel}>Name *</Text>
                            <TextInput
                                style={styles.input}
                                value={newProfile.name}
                                onChangeText={(text) => setNewProfile({...newProfile, name: text})}
                                placeholder="Enter name"
                            />

                            <Text style={styles.inputLabel}>Relation *</Text>
                            <TextInput
                                style={styles.input}
                                value={newProfile.relation}
                                onChangeText={(text) => setNewProfile({...newProfile, relation: text})}
                                placeholder="e.g. Son, Daughter"
                            />

                            <Text style={styles.inputLabel}>Birth Date</Text>
                            <TextInput
                                style={styles.input}
                                value={newProfile.birthDate}
                                onChangeText={(text) => setNewProfile({...newProfile, birthDate: text})}
                                placeholder="DD.MM.YYYY"
                            />

                            <Text style={styles.inputLabel}>Age</Text>
                            <TextInput
                                style={styles.input}
                                value={newProfile.age}
                                onChangeText={(text) => setNewProfile({...newProfile, age: text})}
                                placeholder="e.g. 10 years"
                            />

                            <Text style={styles.inputLabel}>Weight</Text>
                            <TextInput
                                style={styles.input}
                                value={newProfile.weight}
                                onChangeText={(text) => setNewProfile({...newProfile, weight: text})}
                                placeholder="e.g. 50kg"
                            />

                            <Text style={styles.inputLabel}>Height</Text>
                            <TextInput
                                style={styles.input}
                                value={newProfile.height}
                                onChangeText={(text) => setNewProfile({...newProfile, height: text})}
                                placeholder="e.g. 5'3"
                            />

                            <Text style={styles.inputLabel}>Gender</Text>
                            <TextInput
                                style={styles.input}
                                value={newProfile.gender}
                                onChangeText={(text) => setNewProfile({...newProfile, gender: text})}
                                placeholder="e.g. Male, Female"
                            />

                            <Text style={styles.inputLabel}>Blood Type</Text>
                            <TextInput
                                style={styles.input}
                                value={newProfile.bloodType}
                                onChangeText={(text) => setNewProfile({...newProfile, bloodType: text})}
                                placeholder="e.g. A+, O-"
                            />

                            <Text style={styles.inputLabel}>Allergies</Text>
                            <View style={styles.allergyInputContainer}>
                                <TextInput
                                    style={styles.allergyInput}
                                    value={allergyInput}
                                    onChangeText={setAllergyInput}
                                    placeholder="Add allergy"
                                />
                                <TouchableOpacity 
                                    style={styles.addAllergyButton}
                                    onPress={addAllergy}
                                >
                                    <Feather name="plus" size={16} color="#FFFFFF" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.allergiesContainer}>
                                {newProfile.allergies.map((allergy, index) => (
                                    <View key={index} style={styles.allergyChip}>
                                        <Text style={styles.allergyText}>{allergy}</Text>
                                        <TouchableOpacity onPress={() => removeAllergy(index)}>
                                            <Feather name="x" size={16} color="#2C4157" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </ScrollView>

                        <TouchableOpacity 
                            style={styles.saveButton}
                            onPress={addProfile}
                        >
                            <Text style={styles.saveButtonText}>Add Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Image Picker Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={imagePickerVisible}
                onRequestClose={() => {
                    setImagePickerVisible(false);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.imagePickerContent}>
                        <Text style={styles.imagePickerTitle}>Choose Profile Picture</Text>
                        
                        <TouchableOpacity 
                            style={styles.imagePickerOption}
                            onPress={takePhoto}
                        >
                            <Feather name="camera" size={24} color="#2C4157" />
                            <Text style={styles.imagePickerOptionText}>Take Photo</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.imagePickerOption}
                            onPress={pickImage}
                        >
                            <Feather name="image" size={24} color="#2C4157" />
                            <Text style={styles.imagePickerOptionText}>Choose from Gallery</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={styles.cancelButton}
                            onPress={() => setImagePickerVisible(false)}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    header: {
        marginBottom: 20,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        width: '48%',
        justifyContent: 'center',
    },
    addButton: {
        backgroundColor: '#3498db',
    },
    removeButton: {
        backgroundColor: '#e74c3c',
    },
    buttonText: {
        color: '#FFFFFF',
        marginLeft: 8,
        fontWeight: '500',
    },
    svgContainer: {
        alignItems: 'center',
        marginBottom: -45,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    imagePickerContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    imagePickerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C4157',
        textAlign: 'center',
        marginBottom: 20,
    },
    imagePickerOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E8F1F9',
    },
    imagePickerOptionText: {
        fontSize: 16,
        color: '#2C4157',
        marginLeft: 15,
    },
    cancelButton: {
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#e74c3c',
        fontWeight: '600',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2C4157',
    },
    modalForm: {
        maxHeight: '70%',
    },
    profileImageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImagePreview: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    changeImageButton: {
        flexDirection: 'row',
        backgroundColor: '#3498db',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    changeImageText: {
        color: '#FFFFFF',
        marginLeft: 6,
        fontWeight: '500',
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2C4157',
        marginTop: 10,
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8F1F9',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#F8FBFE',
        marginBottom: 10,
    },
    allergyInputContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    allergyInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E8F1F9',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        backgroundColor: '#F8FBFE',
        marginRight: 10,
    },
    addAllergyButton: {
        backgroundColor: '#3498db',
        borderRadius: 8,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    allergiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15,
    },
    allergyChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F1F9',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        margin: 4,
    },
    allergyText: {
        fontSize: 14,
        color: '#2C4157',
        marginRight: 6,
    },
    saveButton: {
        backgroundColor: '#2ecc71',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default UserProfile;