// ProfileComponents/ImagePickerModal.js
import React from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ImagePickerModal = ({ visible, onClose, onTakePhoto, onPickImage }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.imagePickerContent}>
                    <Text style={styles.imagePickerTitle}>Choose Profile Picture</Text>
                    
                    <TouchableOpacity 
                        style={styles.imagePickerOption}
                        onPress={onTakePhoto}
                    >
                        <Feather name="camera" size={24} color="#2C4157" />
                        <Text style={styles.imagePickerOptionText}>Take Photo</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.imagePickerOption}
                        onPress={onPickImage}
                    >
                        <Feather name="image" size={24} color="#2C4157" />
                        <Text style={styles.imagePickerOptionText}>Choose from Gallery</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.cancelButton}
                        onPress={onClose}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    imagePickerContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    imagePickerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2C4157',
        textAlign: 'center',
        marginBottom: 20,
    },
    imagePickerOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E8F1F9',
    },
    imagePickerOptionText: {
        fontSize: 16,
        color: '#2C4157',
        marginLeft: 15,
    },
    cancelButton: {
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#e74c3c',
        fontWeight: '600',
    },
});

export default ImagePickerModal;