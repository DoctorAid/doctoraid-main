import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

const sampleProfiles = [
    { id: 1, name: 'Nimesha Dahanayake', relation: 'Daughter', birthDate: '10.02.2014', age: '10 years', weight: '50kg', height: "5'3", gender: 'Female', image: 'https://i.pravatar.cc/100?img=1' },
    { id: 2, name: 'John Smith', relation: 'Son', birthDate: '12.05.2016', age: '8 years', weight: '40kg', height: "4'8", gender: 'Male', image: 'https://i.pravatar.cc/100?img=2' },
    { id: 3, name: 'Sarah Johnson', relation: 'Daughter', birthDate: '20.09.2012', age: '12 years', weight: '55kg', height: "5'5", gender: 'Female', image: 'https://i.pravatar.cc/100?img=3' }
];

const UserSwitch = ({ onProfileChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(sampleProfiles[0]);

    const toggleDropdown = () => setIsOpen(!isOpen);
    
    const selectProfile = (profile) => {
        setSelectedProfile(profile);
        setIsOpen(false);
        onProfileChange(profile); // Update selected profile in parent component
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleDropdown} style={styles.selectedProfile}>
                <Image source={{ uri: selectedProfile.image }} style={styles.profileImage} />
                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{selectedProfile.name}</Text>
                    <Text style={styles.relation}>{selectedProfile.relation}</Text>
                </View>
                <Text style={[styles.arrow, isOpen && styles.arrowUp]}>▼</Text>
            </TouchableOpacity>

            {isOpen && (
                <View style={styles.dropdown}>
                    {sampleProfiles.map((profile) => (
                        <TouchableOpacity key={profile.id} onPress={() => selectProfile(profile)} style={styles.dropdownItem}>
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

const styles = {
    container: { width: '90%', flexDirection: 'column', marginTop: 180, alignSelf: 'center' },
    selectedProfile: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#e6f3ff', borderRadius: 8 },
    profileImage: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
    profileInfo: { flex: 1, flexDirection: 'column' },
    name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    relation: { fontSize: 14, color: '#666' },
    arrow: { fontSize: 16, color: '#666', padding: 5 },
    arrowUp: { transform: [{ rotate: '180deg' }] },
    dropdown: { marginTop: 5, backgroundColor: 'white', borderRadius: 8, elevation: 3, flexDirection: 'column' },
    dropdownItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
    dropdownImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    dropdownInfo: { flex: 1, flexDirection: 'column' },
    dropdownName: { fontSize: 14, fontWeight: 'bold', color: '#333' },
    dropdownRelation: { fontSize: 12, color: '#666' },
};

export default UserSwitch;
