import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const TimeSelector = () => {
    const [selectedTime, setSelectedTime] = useState('9:10 am');

    const times = [
        { id: 1, time: '9:00 am' },
        { id: 2, time: '9:10 am' },
        { id: 3, time: '9:20 am' },
        { id: 4, time: '9:30 am' },
        { id: 5, time: '9:40 am' },
        { id: 6, time: '9:50 am' },
        { id: 7, time: '10:00 am' },
    ];

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    timeBox: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        backgroundColor: '#C9E4F3',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedBox: {
        backgroundColor: '#295567'
    },
    timeText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#334155'
    },
    selectedText: {
        color: '#FFFFFF'
    }
});

export default TimeSelector;