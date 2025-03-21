import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const FormField = ({ label, value, onChange, placeholder = '' }) => (
    <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>{label}</Text>
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor="#A9B9CB"
        />
    </View>
);

const styles = StyleSheet.create({
    fieldContainer: {
        marginBottom: 16,
    },
    fieldLabel: {
        fontSize: 16,
        color: '#2C4157',
        fontWeight: '500',
        marginBottom: 6,
    },
    input: {
        height: 46,
        borderWidth: 1,
        borderColor: '#E8F1F9',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        color: '#2C4157',
        backgroundColor: '#F8FBFE',
    },
});

export default FormField;