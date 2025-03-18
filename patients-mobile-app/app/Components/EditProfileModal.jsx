import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Modal, 
    Animated,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    FlatList
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import FormField from './FormField';
import AllergyField from './AllergyField';

const EditProfileModal = ({ isVisible, onClose, section, profile, onSave }) => {
    // Parse allergies - if it's a string, convert to array, if already array keep as is
    const parseAllergies = (allergiesData) => {
        if (typeof allergiesData === 'string') {
            // If empty or just a single name, make appropriate array
            if (!allergiesData.trim()) return [];
            return [allergiesData];
        }
        return Array.isArray(allergiesData) ? allergiesData : [];
    };

    // Relation options
    const relationOptions = [
        'Father', 
        'Mother', 
        'Son', 
        'Daughter', 
        'Grandfather', 
        'Grandmother', 
        'Other'
    ];

    // Initial form state based on section and profile data
    const initialFormState = () => {
        if (section === 'general') {
            return {
                name: profile.name || '',
                relation: profile.relation || '',
                birthDate: profile.birthDate || '',
                age: profile.age || '',
                weight: profile.weight || '',
                height: profile.height || '',
                gender: profile.gender || ''
            };
        } else {
            return {
                allergies: parseAllergies(profile.allergies || []),
                bloodType: profile.bloodType || ''
            };
        }
    };

    const [formData, setFormData] = useState(initialFormState());
    const [slideAnim] = useState(new Animated.Value(300));
    const [fadeAnim] = useState(new Animated.Value(0));
    const [showRelationDropdown, setShowRelationDropdown] = useState(false);

    // Reset form data when modal opens with new section
    useEffect(() => {
        setFormData(initialFormState());
    }, [isVisible, section, profile]);

    // Animation for modal entry and exit
    useEffect(() => {
        if (isVisible) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 300,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [isVisible]);

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    // Relation dropdown handlers
    const toggleRelationDropdown = () => {
        setShowRelationDropdown(!showRelationDropdown);
    };

    const selectRelation = (relation) => {
        handleChange('relation', relation);
        setShowRelationDropdown(false);
    };

    // Allergy handlers
    const handleAddAllergy = (allergy) => {
        setFormData(prev => ({
            ...prev,
            allergies: [...prev.allergies, allergy]
        }));
    };

    const handleRemoveAllergy = (index) => {
        setFormData(prev => ({
            ...prev,
            allergies: prev.allergies.filter((_, i) => i !== index)
        }));
    };

    const handleSave = () => {
        onSave(section, formData);
        onClose();
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
        setShowRelationDropdown(false);
    };

    // Render relation dropdown
    const renderRelationField = () => {
        return (
            <View style={styles.fieldContainer}>
                <Text style={styles.fieldLabel}>Relation</Text>
                <TouchableOpacity 
                    style={styles.dropdownButton}
                    onPress={toggleRelationDropdown}
                >
                    <Text style={styles.dropdownButtonText}>
                        {formData.relation || 'Select relation'}
                    </Text>
                    <Feather 
                        name={showRelationDropdown ? "chevron-up" : "chevron-down"} 
                        size={20} 
                        color="#6B7C8F" 
                    />
                </TouchableOpacity>
                
                {showRelationDropdown && (
                    <View style={styles.dropdownContainer}>
                        <FlatList
                            data={relationOptions}
                            keyExtractor={(item) => item}
                            renderItem={({ item }) => (
                                <TouchableOpacity 
                                    style={styles.dropdownItem}
                                    onPress={() => selectRelation(item)}
                                >
                                    <Text style={styles.dropdownItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                            nestedScrollEnabled={true}
                            style={styles.dropdownList}
                        />
                    </View>
                )}
            </View>
        );
    };

    // Render form fields based on section
    const renderFields = () => {
        if (section === 'general') {
            return (
                <>
                    <FormField label="Name" value={formData.name} onChange={val => handleChange('name', val)} />
                    {renderRelationField()}
                    <FormField label="Birth Date" value={formData.birthDate} onChange={val => handleChange('birthDate', val)} />
                    <FormField label="Age" value={formData.age} onChange={val => handleChange('age', val)} />
                    <FormField label="Weight" value={formData.weight} onChange={val => handleChange('weight', val)} />
                    <FormField label="Height" value={formData.height} onChange={val => handleChange('height', val)} />
                    <FormField label="Gender" value={formData.gender} onChange={val => handleChange('gender', val)} />
                </>
            );
        } else {
            return (
                <>
                    <AllergyField
                        allergies={formData.allergies}
                        onAdd={handleAddAllergy}
                        onRemove={handleRemoveAllergy}
                    />
                    <FormField label="Blood Type" value={formData.bloodType} onChange={val => handleChange('bloodType', val)} />
                </>
            );
        }
    };

    return (
        <Modal
            transparent
            visible={isVisible}
            animationType="none"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalOverlay}
                >
                    <Animated.View 
                        style={[
                            styles.modalContainer,
                            { 
                                opacity: fadeAnim,
                                transform: [{ translateY: slideAnim }] 
                            }
                        ]}
                    >
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                Edit {section === 'general' ? 'General Info' : 'Medical Info'}
                            </Text>
                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Feather name="x" size={24} color="#2C4157" />
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.indicator} />
                        
                        <ScrollView 
                            style={styles.scrollView}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.scrollContent}
                            nestedScrollEnabled={true}
                        >
                            {renderFields()}
                        </ScrollView>
                        
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
    },
    indicator: {
        width: 40,
        height: 5,
        backgroundColor: '#E8F1F9',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 15,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2C4157',
    },
    closeButton: {
        padding: 5,
    },
    scrollView: {
        maxHeight: '70%',
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
        paddingHorizontal: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F6FD',
        paddingTop: 20,
    },
    cancelButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginRight: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E8F1F9',
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#6B7C8F',
        fontWeight: '600',
    },
    saveButton: {
        backgroundColor: '#2C4157',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        shadowColor: '#2C4157',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    saveButtonText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    // New styles for dropdown
    fieldContainer: {
        marginBottom: 15,
    },
    fieldLabel: {
        fontSize: 16,
        color: '#2C4157',
        marginBottom: 8,
        fontWeight: '500',
    },
    dropdownButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E8F1F9',
        borderRadius: 10,
        padding: 15,
        backgroundColor: '#F9FBFD',
    },
    dropdownButtonText: {
        fontSize: 16,
        color: '#6B7C8F',
    },
    dropdownContainer: {
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#E8F1F9',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        zIndex: 1000,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    dropdownList: {
        maxHeight: 200,
    },
    dropdownItem: {
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F6FD',
    },
    dropdownItemText: {
        fontSize: 16,
        color: '#2C4157',
    },
});

export default EditProfileModal;