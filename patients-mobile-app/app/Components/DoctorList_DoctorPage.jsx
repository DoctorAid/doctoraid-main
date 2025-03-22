import React from 'react';
import { View, FlatList } from 'react-native';
import DoctorItem from '../Components/DoctorItem_DoctorPage';
import { navigate } from 'expo-router/build/global-state/routing';
import { useNavigation } from '@react-navigation/native';

const DoctorList = ({ doctors, onDoctorSelect }) => {
  const navigation = useNavigation();
  
  const handleDoctorPress = (doctor) => {
    if (onDoctorSelect) {
      onDoctorSelect(doctor);
    }
    navigation.navigate('./DoctorAppointment', { doctor });
  };

  return (
    <View>
      <FlatList
        data={doctors}
        renderItem={({ item }) => (
          <DoctorItem 
            doctor={item} 
            onPress={() =>  onDoctorSelect(item)}
            
          />
        )}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default DoctorList;