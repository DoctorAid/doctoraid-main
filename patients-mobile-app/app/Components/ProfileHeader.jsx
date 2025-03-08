// ProfileComponents/ProfileHeader.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import UserSwitch from '../Components/UserSwitch';

const ProfileHeader = ({ 
    profiles, 
    selectedProfile, 
    onProfileChange, 
    onAddProfile, 
    onRemoveProfile 
}) => {
    return (
        <View style={styles.header}>
            <UserSwitch 
                profiles={profiles} 
                selectedProfile={selectedProfile}
                onProfileChange={onProfileChange}
            />
            <View style={styles.actionsContainer}>
                <TouchableOpacity 
                    style={[styles.actionButton, styles.addButton]} 
                    onPress={onAddProfile}
                >
                    <Feather name="user-plus" size={18} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[
                        styles.actionButton, 
                        styles.removeButton,
                        profiles.length <= 1 && styles.disabledButton
                    ]}
                    onPress={() => onRemoveProfile(selectedProfile.id)}
                    disabled={profiles.length <= 1}
                >
                    <Feather name="user-minus" size={18} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        marginBottom: 20,
        zIndex: 100, // Ensure dropdown appears above other content
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        alignSelf: 'center',
        marginTop: 10,
        zIndex: 1, // Lower than dropdown
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
        backgroundColor: '#295567',
    },
    removeButton: {
        backgroundColor: '#FF5D5D',
    },
    disabledButton: {
        backgroundColor: '#CCCCCC',
        opacity: 0.7,
    },
    buttonText: {
        color: '#FFFFFF',
        marginLeft: 8,
        fontWeight: '500',
    },
});

export default ProfileHeader;