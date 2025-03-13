// ProfileComponents/AddProfileModal.js
import React from 'react';
import { View, Modal, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ProfileForm from './ProfileForm';

const AddProfileModal = ({ 
    visible, 
    newProfile, 
    allergyInput, 
    windowHeight,
    modalScrollViewRef,
    onClose, 
    onProfileChange, 
    onAllergyInputChange, 
    onAddAllergy, 
    onRemoveAllergy,
    onSave,
    onImagePickerOpen
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.modalOverlay}
            >
                <View style={[styles.modalContent, { maxHeight: windowHeight * 0.85 }]}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Add New Profile</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Feather name="x" size={24} color="#2C4157" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView 
                        ref={modalScrollViewRef}
                        style={styles.modalForm}
                        showsVerticalScrollIndicator={true}
                        keyboardShouldPersistTaps="handled"
                    >
                        <ProfileForm 
                            profile={newProfile}
                            allergyInput={allergyInput}
                            onProfileChange={onProfileChange}
                            onAllergyInputChange={onAllergyInputChange}
                            onAddAllergy={onAddAllergy}
                            onRemoveAllergy={onRemoveAllergy}
                            onChangeImage={onImagePickerOpen}
                        />
                        
                        {/* Add extra padding at the bottom for better scrolling */}
                        <View style={{ height: 80 }} />
                    </ScrollView>

                    <View style={styles.saveButtonContainer}>
                        <TouchableOpacity 
                            style={styles.saveButton}
                            onPress={onSave}
                        >
                            <Text style={styles.saveButtonText}>Add Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
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
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2C4157',
    },
    modalForm: {
        maxHeight: '70%',
    },
    saveButtonContainer: {
        marginTop: 10,
    },
    saveButton: {
        backgroundColor: '#DBF3C9',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#295567',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddProfileModal;