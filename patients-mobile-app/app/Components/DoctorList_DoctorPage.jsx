import React from 'react';
import { View, FlatList } from 'react-native';
import DoctorItem from '../Components/DoctorItem_DoctorPage';


const DoctorList = ({ doctors }) => {
  return (
    <View>
      <FlatList
        data={doctors}
        renderItem={({ item }) => <DoctorItem doctor={item} />}
        keyExtractor={item => item.id}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
};

export default DoctorList;