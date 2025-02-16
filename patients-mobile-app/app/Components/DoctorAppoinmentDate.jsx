import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const DateSelector = ({ onDateSelect }) => {
    const [selectedDate, setSelectedDate] = useState(20);

    const dates = [
        { date: 19, day: 'Sat' },
        { date: 20, day: 'Sun' },
        { date: 21, day: 'Mon' },
        { date: 22, day: 'Tue' },
        { date: 23, day: 'Wed' },
        { date: 24, day: 'Thu' },
        { date: 25, day: 'Fri' },
    ];

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        if (onDateSelect) {
            onDateSelect(date);
        }
    };

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    dateBox: {
        width: 64,
        height: 64,
        backgroundColor: '#C9E4F3',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedDateBox: {
        backgroundColor: '#295567',
    },
    dateNumber: {
        fontSize: 20,
        fontWeight: '600',
        color: '#334155',
    },
    dayText: {
        fontSize: 14,
        color: '#334155',
        marginTop: 4,
    },
    selectedText: {
        color: '#FFFFFF',
    },
});

export default DateSelector;