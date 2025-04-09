import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SessionSelector = ({ sessions, onSessionSelect }) => {
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  // Function to get formatted date string for each session
  const getSessionDate = (sessionId) => {
    // This is an example implementation - in a real app, you would have actual dates for each session
    // For this example, I'm creating demo dates based on session ID
    const today = new Date();
    const sessionDate = new Date(today);
    
    // Add days based on session ID to create different dates
    sessionDate.setDate(today.getDate() + parseInt(sessionId));
    
    // Format date as DD-MM-YYYY
    const day = String(sessionDate.getDate()).padStart(2, '0');
    const month = String(sessionDate.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed
    const year = sessionDate.getFullYear();
    
    return `${day}-${month}-${year}`;
  };

  const handleSessionSelect = (session) => {
    setSelectedSessionId(session.id);
    
    // Add date to the session object before passing it to the parent
    const sessionWithDate = {
      ...session,
      date: getSessionDate(session.id)
    };
    
    onSessionSelect(sessionWithDate);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Session</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {sessions.map((session) => {
          const sessionDate = getSessionDate(session.id);
          
          return (
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
              
              {/* Date row */}
              <View style={styles.dateRow}>
                <Ionicons 
                  name="calendar-outline" 
                  size={16} 
                  color={selectedSessionId === session.id ? "#FFFFFF" : "#64748B"} 
                />
                <Text 
                  style={[
                    styles.sessionDate, 
                    selectedSessionId === session.id && styles.selectedText
                  ]}
                >
                  {sessionDate}
                </Text>
              </View>
              
              {/* Time row */}
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
          );
        })}
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
    minWidth: 200,
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
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  sessionDate: {
    fontSize: 14,
    color: '#64748B',
    marginLeft: 6,
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