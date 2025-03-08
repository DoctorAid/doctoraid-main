import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const UserSwitch = ({ profiles, selectedProfile, onProfileChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleDropdown = () => setIsOpen(!isOpen);
    
    const selectProfile = (profile) => {
        setIsOpen(false);
        onProfileChange(profile);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Family Profile</Text>
            <TouchableOpacity onPress={toggleDropdown} style={styles.selectedProfile}>
                <Image 
                    source={{ uri: selectedProfile.image }} 
                    style={styles.profileImage} 
                />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{selectedProfile.name}</Text>
                    <Text style={styles.relation}>{selectedProfile.relation}</Text>
                </View>
                <Text style={[styles.arrow, isOpen && styles.arrowUp]}>▼</Text>
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdown}>
                    {profiles.map((profile) => (
                        <TouchableOpacity 
                            key={profile.id} 
                            onPress={() => selectProfile(profile)} 
                            style={[
                                styles.dropdownItem,
                                selectedProfile.id === profile.id && styles.selectedItem
                            ]}
                        >
                            <Image source={{ uri: profile.image }} style={styles.dropdownImage} />
                            <View style={styles.dropdownInfo}>
                                <Text style={styles.dropdownName}>{profile.name}</Text>
                                <Text style={styles.dropdownRelation}>{profile.relation}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        width: '90%',
        alignSelf: 'center',
        marginBottom: 10
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#2C4157',
        marginBottom: 20
    },
    selectedProfile: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 15,
        backgroundColor: '#E8F1F9', 
        borderRadius: 12
    },
    profileImage: { 
        width: 50, 
        height: 50, 
        borderRadius: 25, 
        marginRight: 12
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
        fontSize: 16, 
        color: '#2C4157', 
        padding: 5 
    },
    arrowUp: { 
        transform: [{ rotate: '180deg' }] 
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
        maxHeight: 250
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
    dropdownImage: { 
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        marginRight: 10 
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
});

export default UserSwitch;