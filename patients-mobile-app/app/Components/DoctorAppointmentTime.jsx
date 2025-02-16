import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TimeSelector = () => {
    const [selectedTime, setSelectedTime] = useState('9:10 am');

    const times = [
        { id: 1, time: '9:00 am' },
    ];

    return (
        <View style={styles.container}>
            {times.map(({ id, time }) => (
                <TouchableOpacity
                    key={id}
                    onPress={() => setSelectedTime(time)}
                    style={[
                        styles.timeBox,
                        selectedTime === time && styles.selectedBox
                    ]}
                >
                    <Text 
                        style={[
                            styles.timeText,
                            selectedTime === time && styles.selectedText
                        ]}
                    >
                        {time}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 8,
        padding: 10
    },
    timeBox: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#EBF3FA',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5
    },
    selectedBox: {
        backgroundColor: '#334155'
    },
    timeText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#334155'
    },
    selectedText: {
        color: '#FFFFFF'
    }
});

export default TimeSelector;