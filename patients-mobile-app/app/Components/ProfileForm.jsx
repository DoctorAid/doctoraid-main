// ProfileComponents/ProfileForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Modal, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ProfileForm = ({ 
    profile, 
    allergyInput, 
    onProfileChange, 
    onAllergyInputChange, 
    onAddAllergy, 
    onRemoveAllergy,
    onChangeImage
}) => {
    const [showGenderDropdown, setShowGenderDropdown] = useState(false);
    
    const genderOptions = [
        { id: '1', label: 'Male' },
        { id: '2', label: 'Female' }
    ];
    
    const handleGenderSelect = (gender) => {
        onProfileChange({...profile, gender: gender.label});
        setShowGenderDropdown(true);
    };

    return (
        <View>
            {/* Profile Picture Selection */}
            <View style={styles.profileImageContainer}>
                <Image 
                    source={{ uri: profile.image }} 
                    style={styles.profileImagePreview} 
                />
                <TouchableOpacity 
                    style={styles.changeImageButton}
                    onPress={onChangeImage}
                >
                    <Feather name="camera" size={16} color="#FFFFFF" />
                    <Text style={styles.changeImageText}>Change Picture</Text>
                </TouchableOpacity>
            </View>
            
            <Text style={styles.inputLabel}>Name *</Text>
            <TextInput
                style={styles.input}
                value={profile.name}
                onChangeText={(text) => onProfileChange({...profile, name: text})}
                placeholder="Enter name"
            />

            <Text style={styles.inputLabel}>Relation *</Text>
            <TextInput
                style={styles.input}
                value={profile.relation}
                onChangeText={(text) => onProfileChange({...profile, relation: text})}
                placeholder="e.g. Son, Daughter"
            />

            <Text style={styles.inputLabel}>Birth Date</Text>
            <TextInput
                style={styles.input}
                value={profile.birthDate}
                onChangeText={(text) => onProfileChange({...profile, birthDate: text})}
                placeholder="DD.MM.YYYY"
            />

            <Text style={styles.inputLabel}>Age</Text>
            <TextInput
                style={styles.input}
                value={profile.age}
                onChangeText={(text) => onProfileChange({...profile, age: text})}
                placeholder="e.g. 10 years"
            />

            <Text style={styles.inputLabel}>Weight</Text>
            <TextInput
                style={styles.input}
                value={profile.weight}
                onChangeText={(text) => onProfileChange({...profile, weight: text})}
                placeholder="e.g. 50kg"
            />

            <Text style={styles.inputLabel}>Height</Text>
            <TextInput
                style={styles.input}
                value={profile.height}
                onChangeText={(text) => onProfileChange({...profile, height: text})}
                placeholder="e.g. 5'3"
            />

            <Text style={styles.inputLabel}>Gender *</Text>
            <TouchableOpacity
                style={styles.dropdownSelector}
                onPress={() => setShowGenderDropdown(true)}
            >
                <Text style={profile.gender ? styles.dropdownSelectedText : styles.dropdownPlaceholder}>
                    {profile.gender || "Select gender"}
                </Text>
                <Feather name="chevron-down" size={18} color="#2C4157" />
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Blood Type</Text>
            <TextInput
                style={styles.input}
                value={profile.bloodType}
                onChangeText={(text) => onProfileChange({...profile, bloodType: text})}
                placeholder="e.g. A+, O-"
            />

            <Text style={styles.inputLabel}>Allergies</Text>
            <View style={styles.allergyInputContainer}>
                <TextInput
                    style={styles.allergyInput}
                    value={allergyInput}
                    onChangeText={onAllergyInputChange}
                    placeholder="Add allergy"
                />
                <TouchableOpacity 
                    style={styles.addAllergyButton}
                    onPress={onAddAllergy}
                >
                    <Feather name="plus" size={16} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.allergiesContainer}>
                {profile.allergies.map((allergy, index) => (
                    <View key={index} style={styles.allergyChip}>
                        <Text style={styles.allergyText}>{allergy}</Text>
                        <TouchableOpacity onPress={() => onRemoveAllergy(index)}>
                            <Feather name="x" size={16} color="#295567" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Gender Dropdown Modal */}
            <Modal
                visible={showGenderDropdown}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowGenderDropdown(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowGenderDropdown(false)}
                >
                    <View style={styles.dropdownModal}>
                        <View style={styles.dropdownHeader}>
                            <Text style={styles.dropdownTitle}>Select Gender</Text>
                            <TouchableOpacity onPress={() => setShowGenderDropdown(false)}>
                                <Feather name="x" size={22} color="#2C4157" />
                            </TouchableOpacity>
                        </View>
                        
                        <FlatList
                            data={genderOptions}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.dropdownItem,
                                        profile.gender === item.label && styles.dropdownItemSelected
                                    ]}
                                    onPress={() => handleGenderSelect(item)}
                                >
                                    <Text style={[
                                        styles.dropdownItemText,
                                        profile.gender === item.label && styles.dropdownItemTextSelected
                                    ]}>
                                        {item.label}
                                    </Text>
                                    {profile.gender === item.label && (
                                        <Feather name="check" size={18} color="#295567" />
                                    )}
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
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
        backgroundColor: '#295567',
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
    // Dropdown styles
    dropdownSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8F1F9',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#F8FBFE',
        marginBottom: 10,
    },
    dropdownSelectedText: {
        fontSize: 16,
        color: '#2C4157',
    },
    dropdownPlaceholder: {
        fontSize: 16,
        color: '#A0B0C1',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownModal: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E8F1F9',
    },
    dropdownTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C4157',
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    dropdownItemSelected: {
        backgroundColor: '#E8F1F9',
    },
    dropdownItemText: {
        fontSize: 16,
        color: '#2C4157',
    },
    dropdownItemTextSelected: {
        fontWeight: '500',
        color: '#295567',
    },
    separator: {
        height: 1,
        backgroundColor: '#E8F1F9',
    },
    // Allergy styles
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
        backgroundColor: '#295567',
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
});

export default ProfileForm;