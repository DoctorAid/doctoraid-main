import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Modal, 
    TouchableOpacity, 
    TextInput, 
    ScrollView, 
    Image,
    KeyboardAvoidingView,
    Platform,
    FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import RelationDropdown from './Users_RelationDropdown';

// Gender Dropdown Component
const GenderDropdown = ({ selectedGender, onGenderChange }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    
    const genderOptions = [
        { id: '1', label: 'Male' },
        { id: '2', label: 'Female' }
    ];
    
    const handleSelect = (gender) => {
        onGenderChange(gender.label);
        setShowDropdown(false);
    };
    
    return (
        <View>
            <TouchableOpacity 
                style={styles.dropdownSelector}
                onPress={() => setShowDropdown(true)}
            >
                <Text style={selectedGender ? styles.dropdownText : styles.dropdownPlaceholder}>
                    {selectedGender || "Select gender"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
            </TouchableOpacity>
            
            <Modal
                visible={showDropdown}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowDropdown(false)}
            >
                <TouchableOpacity 
                    style={styles.dropdownOverlay}
                    activeOpacity={1}
                    onPress={() => setShowDropdown(false)}
                >
                    <View style={styles.dropdownContainer}>
                        <View style={styles.dropdownHeader}>
                            <Text style={styles.dropdownTitle}>Select Gender</Text>
                            <TouchableOpacity onPress={() => setShowDropdown(false)}>
                                <Ionicons name="close" size={22} color="#333" />
                            </TouchableOpacity>
                        </View>
                        
                        <FlatList
                            data={genderOptions}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.dropdownItem,
                                        selectedGender === item.label && styles.dropdownItemSelected
                                    ]}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Text style={styles.dropdownItemText}>{item.label}</Text>
                                    {selectedGender === item.label && (
                                        <Ionicons name="checkmark" size={20} color="#295567" />
                                    )}
                                </TouchableOpacity>
                            )}
                            ItemSeparatorComponent={() => <View style={styles.separator} />}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};

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
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.centeredView}
            >
                <View style={[styles.modalView, { maxHeight: windowHeight * 0.9 }]}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.headerText}>Add Family Member</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView 
                        ref={modalScrollViewRef}
                        style={styles.formContainer}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: newProfile.image }}
                                style={styles.profileImage}
                            />
                            <TouchableOpacity 
                                style={styles.changeImageButton}
                                onPress={onImagePickerOpen}
                            >
                                <Text style={styles.changeImageText}>Change Photo</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Name*</Text>
                            <TextInput
                                style={styles.input}
                                value={newProfile.name}
                                onChangeText={(text) => onProfileChange({...newProfile, name: text})}
                                placeholder="Enter name"
                            />
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Relation*</Text>
                            <RelationDropdown
                                selectedRelation={newProfile.relation}
                                onRelationChange={(relation) => onProfileChange({...newProfile, relation})}
                                style={{}}  
                            />
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Birth Date</Text>
                            <TextInput
                                style={styles.input}
                                value={newProfile.birthDate}
                                onChangeText={(text) => onProfileChange({...newProfile, birthDate: text})}
                                placeholder="DD.MM.YYYY"
                            />
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Age</Text>
                            <TextInput
                                style={styles.input}
                                value={newProfile.age}
                                onChangeText={(text) => onProfileChange({...newProfile, age: text})}
                                placeholder="E.g., 10 years"
                            />
                        </View>
                        
                        <View style={styles.inputRow}>
                            <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                                <Text style={styles.label}>Weight</Text>
                                <TextInput
                                    style={styles.input}
                                    value={newProfile.weight}
                                    onChangeText={(text) => onProfileChange({...newProfile, weight: text})}
                                    placeholder="E.g., 50kg"
                                />
                            </View>
                            
                            <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                                <Text style={styles.label}>Height</Text>
                                <TextInput
                                    style={styles.input}
                                    value={newProfile.height}
                                    onChangeText={(text) => onProfileChange({...newProfile, height: text})}
                                    placeholder="E.g., 5'3"
                                />
                            </View>
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Gender*</Text>
                            <GenderDropdown
                                selectedGender={newProfile.gender}
                                onGenderChange={(gender) => onProfileChange({...newProfile, gender})}
                            />
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Blood Type</Text>
                            <TextInput
                                style={styles.input}
                                value={newProfile.bloodType}
                                onChangeText={(text) => onProfileChange({...newProfile, bloodType: text})}
                                placeholder="E.g., A+"
                            />
                        </View>
                        
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Allergies</Text>
                            <View style={styles.allergyInputContainer}>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    value={allergyInput}
                                    onChangeText={onAllergyInputChange}
                                    placeholder="E.g., Peanuts"
                                />
                                <TouchableOpacity 
                                    style={styles.addButton}
                                    onPress={onAddAllergy}
                                >
                                    <Text style={styles.addButtonText}>Add</Text>
                                </TouchableOpacity>
                            </View>
                            
                            {newProfile.allergies.length > 0 && (
                                <View style={styles.allergiesList}>
                                    {newProfile.allergies.map((allergy, index) => (
                                        <View key={index} style={styles.allergyItem}>
                                            <Text style={styles.allergyText}>{allergy}</Text>
                                            <TouchableOpacity
                                                onPress={() => onRemoveAllergy(index)}
                                                style={styles.removeButton}
                                            >
                                                <Ionicons name="close-circle" size={20} color="#295567" />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                </View>
                            )}
                        </View>
                    </ScrollView>
                    
                    <TouchableOpacity 
                        style={styles.saveButton}
                        onPress={onSave}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        paddingBottom: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    formContainer: {
        maxHeight: '80%',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    changeImageButton: {
        backgroundColor: '#F0F0F0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    changeImageText: {
        color: '#333',
        fontSize: 14,
    },
    inputGroup: {
        marginBottom: 16,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 6,
        color: '#666',
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#FFFFFF',
    },
    // Gender dropdown styles
    dropdownSelector: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
        backgroundColor: '#FFFFFF',
    },
    dropdownText: {
        fontSize: 16,
        color: '#333',
    },
    dropdownPlaceholder: {
        fontSize: 16,
        color: '#999',
    },
    dropdownOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    dropdownTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    dropdownItemSelected: {
        backgroundColor: '#F5F5F5',
    },
    dropdownItemText: {
        fontSize: 16,
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginHorizontal: 10,
    },
    // Allergy styles
    allergyInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#295567',
        padding: 12,
        borderRadius: 8,
        marginLeft: 8,
    },
    addButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    allergiesList: {
        marginTop: 12,
    },
    allergyItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 6,
        marginBottom: 6,
    },
    allergyText: {
        flex: 1,
        fontSize: 14,
    },
    removeButton: {
        padding: 4,
    },
    saveButton: {
        backgroundColor: '#295567',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default AddProfileModal;