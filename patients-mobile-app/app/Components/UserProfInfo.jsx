import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { PenSquare } from 'lucide-react';

// Theme variables
const theme = {
  primaryColor: '#2C4A6B',
  secondaryColor: '#F8F9FA',
  textColor: '#2C4A6B',
  borderRadius: 16,
  padding: 24,
  cardBg: 'white',
  headingSize: 28,
  labelSize: 16,
  valueSize: 18,
};

function App() {
  const generalInfo = [
    { label: 'Name', value: 'Nimesha Dahanayake' },
    { label: 'Relation', value: 'Son' },
    { label: 'Birth Date', value: '10.02.2014' },
    { label: 'Age', value: '10 years' },
    { label: 'Weight', value: '50kg' },
    { label: 'Height', value: "5'3" },
    { label: 'Gender', value: 'Female' },
  ];

  const medicalInfo = [
    { label: 'Allergies', value: 'Arya Muller' },
    { label: 'Blood Type', value: 'Arya Muller' },
  ];

  const handleEdit = () => {
    console.log('Edit clicked');
  };

  const InfoCard = ({ title, items, onEdit }) => {
    return (
      <View style={styles.infoCard}>
        <View style={styles.infoCardHeader}>
          <Text style={styles.infoCardTitle}>{title}</Text>
          {onEdit && (
            <TouchableOpacity onPress={onEdit}>
              <PenSquare
                size={20}
                color={theme.primaryColor}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.infoGrid}>
          {items.map((item, index) => (
            <View key={index} style={styles.infoItem}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <InfoCard 
          title="General Info" 
          items={generalInfo} 
          onEdit={handleEdit}
        />
        <InfoCard 
          title="Medical Info" 
          items={medicalInfo} 
          onEdit={handleEdit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100vh',
    backgroundColor: theme.secondaryColor,
    padding: theme.padding,
  },
  content: {
    maxWidth: 768,
    marginHorizontal: 'auto',
    width: '100%',
  },
  infoCard: {
    backgroundColor: theme.cardBg,
    borderRadius: theme.borderRadius,
    padding: theme.padding,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(44, 74, 107, 0.1)',
    paddingBottom: 12,
  },
  infoCardTitle: {
    color: theme.primaryColor,
    fontSize: theme.headingSize,
    fontWeight: '600',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -12,
  },
  infoItem: {
    width: '50%',
    paddingHorizontal: 12,
    marginBottom: 24,
    backgroundColor: 'transparent',
    borderRadius: 8,
    padding: 8,
  },
  infoLabel: {
    color: theme.textColor,
    fontSize: theme.labelSize,
    fontWeight: '500',
    marginBottom: 4,
    opacity: 0.8,
  },
  infoValue: {
    color: theme.textColor,
    fontSize: theme.valueSize,
    fontWeight: '400',
  },
  '@media (max-width: 640px)': {
    container: {
      padding: 16,
    },
    infoCard: {
      padding: 16,
    },
    infoItem: {
      width: '100%',
    },
  },
});

export default App;