import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const Scene03 = () => {
  const router = useRouter();
  
  const goToHome = () => {
    // Try with the correct path to your home tab
    router.replace('/(Tabs)/home');
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Onboarding - Scene 3</Text>
      {/* Your onboarding content here */}
      
      <TouchableOpacity 
        style={styles.button}
        onPress={goToHome}
      >
        <Text style={styles.buttonText}>Finish & Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Scene03;