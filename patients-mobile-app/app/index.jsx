import { Text, View, Image, StyleSheet } from "react-native";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";

const StartPage = () => {

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // 3-second delay before redirecting
    const timer = setTimeout(() => {
      setIsReady(true); // isReady will be to true after 3 seconds
    }, 3000);

    // Clear the timeout if the component is unmounted before 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (isReady) {
    // return <Redirect href="/home" />;
    return <Redirect href="/UserOnboarding/scene01" />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('./Assets/images/Logo.png')} 
        style={styles.logo}
      />  
        
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#C9E4F3', 
  },
  logo: {
    width: 83, 
    height: 95,
    resizeMode: 'contain', 
    marginBottom: 20, 
  },
});

export default StartPage;
