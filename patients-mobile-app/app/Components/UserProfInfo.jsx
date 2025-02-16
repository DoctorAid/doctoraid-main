import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const UserProfInfo = ({ profile }) => {
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>General Info</Text>
                    <Feather name="edit-2" size={20} color="#2C4157" />
                </View>
                <InfoRow label="Name" value={profile.name} />
                <InfoRow label="Relation" value={profile.relation} />
                <InfoRow label="Birth Date" value={profile.birthDate} />
                <InfoRow label="Age" value={profile.age} />
                <InfoRow label="Weight" value={profile.weight} />
                <InfoRow label="Height" value={profile.height} />
                <InfoRow label="Gender" value={profile.gender} />
            </View>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Medical Info</Text>
                    <Feather name="edit-2" size={20} color="#2C4157" />
                </View>
                <InfoRow label="Allergies" value={profile.allergies} />
                <InfoRow label="Blood Type" value={profile.bloodType} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollView: {
        width: '100%'
    },
    container: {
        width: '90%',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2C4157',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E8F1F9',
    },
    label: {
        fontSize: 16,
        color: '#2C4157',
        fontWeight: '500',
    },
    value: {
        fontSize: 16,
        color: '#6B7C8F',
        textAlign: 'right',
    },
});

export default UserProfInfo;