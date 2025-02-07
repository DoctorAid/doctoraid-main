import { View, Text, StyleSheet } from 'react-native';
import DoctorCardType2 from '../Components/DoctorCardType2'

export default function Tab() {
  return (
    <View style={styles.container}>
      <DoctorCardType2/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
