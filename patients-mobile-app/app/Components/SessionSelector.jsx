import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SessionSelector = ({ sessions, onSessionSelect }) => {
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  const handleSessionSelect = (session) => {
    setSelectedSessionId(session.id);
    onSessionSelect(session);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Session</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {sessions.map((session) => (
          <TouchableOpacity
            key={session.id}
            style={[
              styles.sessionCard,
              selectedSessionId === session.id && styles.selectedSessionCard
            ]}
            onPress={() => handleSessionSelect(session)}
          >
            <Text 
              style={[
                styles.sessionName, 
                selectedSessionId === session.id && styles.selectedText
              ]}
            >
              {session.name}
            </Text>
            <View style={styles.timeRow}>
              <Ionicons 
                name="time-outline" 
                size={16} 
                color={selectedSessionId === session.id ? "#FFFFFF" : "#64748B"} 
              />
              <Text 
                style={[
                  styles.sessionTime, 
                  selectedSessionId === session.id && styles.selectedText
                ]}
              >
                {session.startTime} - {session.endTime}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  sessionCard: {
    backgroundColor: '#E5EEF7',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    minWidth: 180,
  },
  selectedSessionCard: {
    backgroundColor: '#295567',
  },
  sessionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionTime: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 6,
  },
  selectedText: {
    color: '#FFFFFF',
  },
});

export default SessionSelector;