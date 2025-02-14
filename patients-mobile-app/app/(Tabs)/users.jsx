import React, { useState } from 'react';
import { View } from 'react-native';
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
        image: 'https://i.pravatar.cc/100?img=1'
    });

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <UserSwitch onProfileChange={setSelectedProfile} />
            <UserProfInfo profile={selectedProfile} />
        </View>
    );
};

export default UserProfile;
