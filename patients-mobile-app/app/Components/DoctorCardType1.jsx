import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const appointments = [
  {
    id: '1',
    doctorName: 'Dr. Lakee Jayamanne',
    patientName: 'Nimesha',
    date: 'Sunday, 12 June',
    time: '11:00 AM - 12:00 AM',
  },
];

const DoctorCard = ({ doctorName, patientName, date, time }) => {
  return (
    <TouchableOpacity style={{ backgroundColor: '#1E3A8A', padding: 16, borderRadius: 16, margin: 8 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: 'white' }} />
        <View style={{ marginLeft: 16, flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{doctorName}</Text>
          <Text style={{ color: '#D1D5DB', fontSize: 14 }}>For <Text style={{ fontWeight: 'bold' }}>{patientName}</Text></Text>
        </View>
        <FontAwesome name="chevron-right" size={18} color="white" />
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#9CA3AF', marginVertical: 8 }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <FontAwesome name="calendar" size={16} color="white" style={{ marginRight: 8 }} />
        <Text style={{ color: 'white', fontSize: 14 }}>{date}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
        <FontAwesome name="clock-o" size={16} color="white" style={{ marginRight: 8 }} />
        <Text style={{ color: 'white', fontSize: 14 }}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const DoctorCardType1 = () => {
  return (
    <FlatList
      data={appointments}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DoctorCard {...item} />}
    />
  );
};

export default DoctorCardType1;
