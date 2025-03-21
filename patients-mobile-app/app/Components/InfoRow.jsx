import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
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

export default InfoRow;