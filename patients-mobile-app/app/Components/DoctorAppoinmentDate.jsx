// DateSelector.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DateSelector = ({ onDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState(20); // Default selected date

    const dates = [
        { date: 19, day: 'Sat' },
    ];

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        if (onDateSelect) {
            onDateSelect(date);
        }
    };

    return (
        <View style={styles.container}>
            {dates.map(({ date, day }) => (
                <TouchableOpacity
                    key={date}
                    style={[
                        styles.dateBox,
                        selectedDate === date && styles.selectedDateBox
                    ]}
                    onPress={() => handleDateSelect(date)}
                >
                    <Text style={[
                        styles.dateNumber,
                        selectedDate === date && styles.selectedText
                    ]}>
                        {date}
                    </Text>
                    <Text style={[
                        styles.dayText,
                        selectedDate === date && styles.selectedText
                    ]}>
                        {day}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 16,
    },
    dateBox: {
        width: 50,
        height: 50,
        backgroundColor: '#EEF2F6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedDateBox: {
        backgroundColor: '#334155',
    },
    dateNumber: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
    },
    dayText: {
        fontSize: 20,
        color: '#334155',
    },
    selectedText: {
        color: '#FFFFFF',
    },
});

export default DateSelector;