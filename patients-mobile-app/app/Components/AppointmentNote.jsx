import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Keyboard,
  Platform
} from 'react-native';

const AppointmentNote = ({ onNoteChange, initialNote = '' }) => {
  const [note, setNote] = useState(initialNote);
  const [isFocused, setIsFocused] = useState(false);
  const [showCharCount, setShowCharCount] = useState(false);
  
  // Create a ref for the TextInput
  const inputRef = React.useRef(null);
  
  const MAX_CHARS = 250;
  
  const handleNoteChange = (text) => {
    if (text.length <= MAX_CHARS) {
      setNote(text);
      onNoteChange(text);
      
      // Show character count when user starts typing
      if (text.length > 0 && !showCharCount) {
        setShowCharCount(true);
      } else if (text.length === 0) {
        setShowCharCount(false);
      }
    }
  };
  
  const handleFocus = () => {
    console.log('TextInput focused');
    setIsFocused(true);
    if (note.length > 0) {
      setShowCharCount(true);
    }
  };
  
  const handleBlur = () => {
    console.log('TextInput blurred');
    setIsFocused(false);
    if (note.length === 0) {
      setShowCharCount(false);
    }
  };
  
  // Force keyboard to show on component mount
  useEffect(() => {
    // Small delay to ensure component is fully rendered
    const timer = setTimeout(() => {
      if (inputRef.current) {
        console.log('Attempting to focus input on mount');
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Function to manually focus the input
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      console.log('Manual focus attempt');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Description</Text>
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={focusInput}
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused
        ]}
      >
        <TextInput
          ref={inputRef}
          style={styles.input}
          multiline
          value={note}
          onChangeText={handleNoteChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Add notes about this appointment..."
          maxLength={MAX_CHARS}
          keyboardType="default"
          autoCapitalize="sentences"
          autoCorrect={true}
          blurOnSubmit={false}
        />
      </TouchableOpacity>
      {showCharCount && (
        <Text style={[
          styles.charCount,
          note.length > MAX_CHARS * 0.8 && styles.charCountWarning
        ]}>
          {note.length}/{MAX_CHARS}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    padding: 12,
    minHeight: 100,
  },
  inputContainerFocused: {
    borderColor: '#295567',
    shadowColor: '#295567',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    fontSize: 16,
    color: '#334155',
    textAlignVertical: 'top',
    minHeight: 80,
    padding: 0, // Remove default padding on Android
  },
  charCount: {
    fontSize: 12,
    color: '#A0AEC0',
    textAlign: 'right',
    marginTop: 4,
  },
  charCountWarning: {
    color: '#F59E0B',
  },
});

export default AppointmentNote;