import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, Animated } from 'react-native';
import UserSwitch from '../Components/UserSwitch';
import UserProfInfo from '../Components/UserProfInfo';

const userprofile = () => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <UserSwitch/>
            <UserProfInfo/>
        </View>
    );
}

export default userprofile;