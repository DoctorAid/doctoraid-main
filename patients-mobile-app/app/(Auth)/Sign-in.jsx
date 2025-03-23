import React, { useRef, useEffect } from 'react'
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Animated,
  Dimensions
} from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper'
import { useSignIn } from '@clerk/clerk-expo'
import { useRouter, Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  // Animation value for the form slide up
  const { height } = Dimensions.get('window')
  const formSlideAnim = useRef(new Animated.Value(height)).current

  // Start with form sliding up animation on component mount
  useEffect(() => {
    Animated.spring(formSlideAnim, {
      toValue: 0,
      tension: 45,
      friction: 10,
      useNativeDriver: true,
    }).start()
  }, [])

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return
    setLoading(true)
    setError(null)

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        // Animate the form sliding down first
        Animated.timing(formSlideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setActive({ session: signInAttempt.createdSessionId })
          router.replace('../(Tabs)/home')
        })
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      setError('Invalid email or password. Please try again.')
      console.error(JSON.stringify(err, null, 2))
    }

    setLoading(false)
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar style="dark" />
      
      <View style={styles.welcomeContainer}>
        <Text style={styles.hello}>Hello, There</Text>
        <Text style={styles.welcomeBack}>Welcome Back!</Text>
      </View>
      
      {/* Form container with slide up animation */}
      <Animated.View 
        style={[
          styles.formOuterContainer,
          { transform: [{ translateY: formSlideAnim }] }
        ]}
      >
        <View style={styles.formHandle} />
        
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Text style={styles.loginNow}>Login Now</Text>
            <Text style={styles.accountNote}>Make sure that you already have not created an account.</Text>
            
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                mode="flat"
                placeholder="Enter your email"
                autoCapitalize="none"
                value={emailAddress}
                onChangeText={setEmailAddress}
                style={styles.input}
                underlineColor="transparent"
                theme={{ colors: { primary: '#5D89A8' } }}
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                mode="flat"
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                underlineColor="transparent"
                right={<TextInput.Icon icon="eye-off" color="#7A8A97" />}
                theme={{ colors: { primary: '#5D89A8' } }}
              />
            </View>

            {error && <Text style={styles.error}>{error}</Text>}

            <Button
              mode="contained"
              onPress={onSignInPress}
              loading={loading}
              style={styles.loginButton}
              labelStyle={styles.loginButtonText}
            >
              Login
            </Button>
            
            <View style={styles.signUpLinkContainer}>
              <Text style={styles.signUpText}>
                Don't have an account?{' '}
                <Link href="./Sign-up" style={styles.signUpLink}>
                  Sign Up
                </Link>
              </Text>
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9E4F3',
  },
  welcomeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 40,
  },
  hello: {
    fontSize: 24,
    color: '#5D89A8',
    fontWeight: '400',
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Raleway-Regular' : 'sans-serif',
  },
  welcomeBack: {
    fontSize: 42,
    color: '#2E4657',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Raleway-Bold' : 'sans-serif-medium',
  },
  formOuterContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 10,
  },
  formHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  formContainer: {
    padding: 24,
  },
  loginNow: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4657',
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Raleway-SemiBold' : 'sans-serif-medium',
  },
  accountNote: {
    fontSize: 14,
    color: '#7A8A97',
    marginBottom: 30,
    fontFamily: Platform.OS === 'ios' ? 'Raleway-Regular' : 'sans-serif',
  },
  formGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#2E4657',
    marginBottom: 8,
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Raleway-Medium' : 'sans-serif-medium',
  },
  input: {
    backgroundColor: '#F9F9F9',
    height: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  loginButton: {
    backgroundColor: '#5591BC',
    borderRadius: 12,
    marginTop: 20,
    height: 55,
    justifyContent: 'center',
    shadowColor: '#5591BC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Raleway-SemiBold' : 'sans-serif-medium',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  signUpLinkContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 14,
    color: '#7A8A97',
    fontFamily: Platform.OS === 'ios' ? 'Raleway-Regular' : 'sans-serif',
  },
  signUpLink: {
    color: '#5591BC',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontFamily: Platform.OS === 'ios' ? 'Raleway-SemiBold' : 'sans-serif-medium',
  }
})