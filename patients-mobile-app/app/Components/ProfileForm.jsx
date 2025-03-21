// ProfileComponents/ProfileForm.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
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

            <Text style={styles.inputLabel}>Gender</Text>
            <TextInput
                style={styles.input}
                value={profile.gender}
                onChangeText={(text) => onProfileChange({...profile, gender: text})}
                placeholder="e.g. Male, Female"
            />

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
                            <Feather name="x" size={16} color="#2C4157" />
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
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