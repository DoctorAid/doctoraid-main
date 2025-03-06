import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import UserSwitch from '../Components/UserSwitch';
import UserProfInfo from '../Components/UserProfInfo';
import FamPic from '../Assets/images/fam.svg';

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
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <UserSwitch onProfileChange={setSelectedProfile} />
                    <UserProfInfo profile={selectedProfile} />
                </View>
                <View style={styles.svgContainer}>
                    <FamPic width={300}  />
                </View>
            </ScrollView>
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
    },
});

export default UserProfile;
