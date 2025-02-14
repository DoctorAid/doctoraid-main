import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserProfInfo = ({ profile }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>General Info</Text>
            <InfoRow label="Name" value={profile.name} />
            <InfoRow label="Relation" value={profile.relation} />
            <InfoRow label="Birth Date" value={profile.birthDate} />
            <InfoRow label="Age" value={profile.age} />
            <InfoRow label="Weight" value={profile.weight} />
            <InfoRow label="Height" value={profile.height} />
            <InfoRow label="Gender" value={profile.gender} />
        </View>
    );
};

const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginTop: 20,
        width: '90%',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        color: '#435B71',
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    label: {
        fontSize: 16,
        color: '#435B71',
        fontWeight: '500',
        flex: 1,
    },
    value: {
        fontSize: 16,
        color: '#7A8D9C',
        flex: 1,
        textAlign: 'right',
    },
});

export default UserProfInfo;
