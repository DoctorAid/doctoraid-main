import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import InfoRow from './InfoRow';
import EditProfileModal from './EditProfileModal';

// Component to display multiple allergies
const AllergiesList = ({ allergies }) => {
    // Handle both string and array formats
    const allergiesArray = Array.isArray(allergies) ? allergies : 
                          (allergies ? [allergies] : []);
    
    if (allergiesArray.length === 0) {
        return <Text style={styles.noDataText}>None</Text>;
    }
    
    return (
        <View style={styles.allergiesContainer}>
            {allergiesArray.map((allergy, index) => (
                <View key={index} style={styles.allergyChip}>
                    <Text style={styles.allergyText}>{allergy}</Text>
                </View>
            ))}
        </View>
    );
};

const UserProfInfo = ({ profile, onUpdateProfile, onChangeImage }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [currentSection, setCurrentSection] = useState('');

    const openModal = (section) => {
        setCurrentSection(section);
        setModalVisible(true);
    };

    const handleSave = (section, data) => {
        // Create updated profile by merging the new data
        const updatedProfile = { ...profile, ...data };
        onUpdateProfile(updatedProfile);
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoCard}>
                <View style={styles.header}>
                    <Text style={styles.title}>General Info</Text>
                    <TouchableOpacity 
                        style={styles.editButton}
                        onPress={() => openModal('general')}
                    >
                        <Feather name="edit-2" size={20} color="#2C4157" />
                    </TouchableOpacity>
                </View>
                
                {/* Profile Image Section */}
                <View style={styles.profileImageSection}>
                    <View style={styles.imageContainer}>
                        <Image 
                            source={{ uri: profile.image }} 
                            style={styles.profileImage} 
                        />
                        <TouchableOpacity 
                            style={styles.editImageButton}
                            onPress={() => onChangeImage(profile.id)}
                        >
                            <Feather name="camera" size={14} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.imageLabel}>Profile Picture</Text>
                </View>
                
                <InfoRow label="Name" value={profile.name} />
                <InfoRow label="Relation" value={profile.relation} />
                <InfoRow label="Birth Date" value={profile.birthDate} />
                <InfoRow label="Age" value={profile.age} />
                <InfoRow label="Weight" value={profile.weight} />
                <InfoRow label="Height" value={profile.height} />
                <InfoRow label="Gender" value={profile.gender} />
            </View>

            <View style={styles.infoCard}>
                <View style={styles.header}>
                    <Text style={styles.title}>Medical Info</Text>
                    <TouchableOpacity 
                        style={styles.editButton}
                        onPress={() => openModal('medical')}
                    >
                        <Feather name="edit-2" size={20} color="#2C4157" />
                    </TouchableOpacity>
                </View>
                
                {/* Special handling for allergies */}
                <View style={styles.infoRow}>
                    <Text style={styles.label}>Allergies</Text>
                    <View style={styles.allergiesWrapper}>
                        <AllergiesList allergies={profile.allergies} />
                    </View>
                </View>
                
                <InfoRow label="Blood Type" value={profile.bloodType} />
            </View>

            <EditProfileModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                section={currentSection}
                profile={profile}
                onSave={handleSave}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    infoCard: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2C4157',
    },
    editButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#F8FBFE',
        borderWidth: 1,
        borderColor: '#E8F1F9',
    },
    profileImageSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E8F1F9',
    },
    imageContainer: {
        position: 'relative',
        marginRight: 15
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    editImageButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#3498db',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    imageLabel: {
        fontSize: 16,
        color: '#2C4157',
        fontWeight: '500',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Changed to flex-start for allergies list
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E8F1F9',
    },
    label: {
        fontSize: 16,
        color: '#2C4157',
        fontWeight: '500',
    },
    allergiesWrapper: {
        flex: 1,
        alignItems: 'flex-end',
        maxWidth: '60%',
    },
    allergiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        gap: 6,
    },
    allergyChip: {
        backgroundColor: '#E8F1F9',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 10,
        marginBottom: 4,
    },
    allergyText: {
        fontSize: 14,
        color: '#2C4157',
    },
    noDataText: {
        fontSize: 16,
        color: '#6B7C8F',
        fontStyle: 'italic',
    },
});

export default UserProfInfo;