import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import UserSwitch from '../Components/UserSwitch';
import UserProfInfo from '../Components/UserProfInfo';

const UserProfile = () => {
    const [selectedProfile, setSelectedProfile] = useState({
        id: 1,
        name: 'Nimesha Dahanayake',
        relation: 'Daughter',
        birthDate: '10.02.2014',
        age: '10 years',
        weight: '50kg',
        height: "5'3",
        gender: 'Female',
        image: 'https://i.pravatar.cc/100?img=1',
        allergies: 'Arya Muller',
        bloodType: 'Arya Muller'
    });

    return (
        <View style={styles.container}>
            <UserSwitch onProfileChange={setSelectedProfile} />
            <UserProfInfo profile={selectedProfile} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FB',
        paddingTop: 40
    }
});

export default UserProfile;