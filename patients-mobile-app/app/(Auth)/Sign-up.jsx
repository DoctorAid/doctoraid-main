import * as React from 'react'
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  Animated,
  Dimensions
} from 'react-native'
import { Text, TextInput, Button, HelperText } from 'react-native-paper'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter, Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [passwordsMatch, setPasswordsMatch] = React.useState(true)
  
  // Animation value for the form slide up
  const { height } = Dimensions.get('window')
  const formSlideAnim = React.useRef(new Animated.Value(height)).current
  const fadeAnim = React.useRef(new Animated.Value(1)).current

  // Start with form sliding up animation on component mount
  React.useEffect(() => {
    Animated.spring(formSlideAnim, {
      toValue: 0,
      tension: 45,
      friction: 10,
      useNativeDriver: true,
    }).start()
  }, [])
  
  // Check if passwords match
  React.useEffect(() => {
    if (confirmPassword.length > 0) {
      setPasswordsMatch(password === confirmPassword)
    } else {
      setPasswordsMatch(true)
    }
  }, [password, confirmPassword])

  // Animation for switching between forms
  const animateTransition = (callback) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      callback()
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start()
    })
  }

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return
    
    // Validate passwords match before proceeding
    if (password !== confirmPassword) {
      setPasswordsMatch(false)
      setError('Passwords do not match')
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      await signUp.create({
        emailAddress,
        password,
      })
      
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      animateTransition(() => setPendingVerification(true))
    } catch (err) {
      setError('Sign-up failed. Please try again.')
      console.error(JSON.stringify(err, null, 2))
    }
    
    setLoading(false)
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return
    setLoading(true)
    setError(null)
    
    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })
      
      if (signUpAttempt.status === 'complete') {
        // Animate the form sliding down first
        Animated.timing(formSlideAnim, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setActive({ session: signUpAttempt.createdSessionId })
          router.replace('../(Tabs)/home')
        })
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      setError('Verification failed. Check your code and try again.')
      console.error(JSON.stringify(err, null, 2))
    }
    
    setLoading(false)
  }

  const renderVerificationForm = () => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={styles.formGroup}>
        <Text style={styles.formTitle}>Verify Your Email</Text>
        <Text style={styles.formSubtitle}>We've sent a verification code to {emailAddress}</Text>
        
        <Text style={styles.inputLabel}>Verification Code</Text>
        <TextInput
          mode="flat"
          placeholder="Enter verification code"
          value={code}
          onChangeText={setCode}
          style={styles.input}
          underlineColor="transparent"
          theme={{ colors: { primary: '#5591BC' } }}
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <Button 
          mode="contained" 
          onPress={onVerifyPress} 
          loading={loading} 
          style={styles.verifyButton}
          labelStyle={styles.buttonText}
        >
          Verify Email
        </Button>
      </View>
    </Animated.View>
  )

  const renderSignUpForm = () => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          mode="flat"
          placeholder="Enter your email"
          autoCapitalize="none"
          value={emailAddress}
          onChangeText={setEmailAddress}
          style={styles.input}
          underlineColor="transparent"
          theme={{ colors: { primary: '#5591BC' } }}
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          mode="flat"
          placeholder="Create a password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          underlineColor="transparent"
          right={<TextInput.Icon icon="eye-off" color="#7A8A97" />}
          theme={{ colors: { primary: '#5591BC' } }}
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          mode="flat"
          placeholder="Confirm your password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[styles.input, !passwordsMatch && styles.inputError]}
          underlineColor="transparent"
          right={<TextInput.Icon icon="eye-off" color="#7A8A97" />}
          theme={{ colors: { primary: '#5591BC' } }}
          error={!passwordsMatch}
        />
        {!passwordsMatch && (
          <HelperText type="error" visible={!passwordsMatch} style={styles.helperText}>
            Passwords don't match
          </HelperText>
        )}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}

      <Button 
        mode="contained" 
        onPress={onSignUpPress} 
        loading={loading} 
        style={styles.signUpButton}
        labelStyle={styles.buttonText}
        disabled={!passwordsMatch || !password || !emailAddress || !confirmPassword}
      >
        Sign Up
      </Button>
      
      <View style={styles.signInLinkContainer}>
        <Text style={styles.signInText}>
          Already have an account?{' '}
          <Link href="./Sign-in" style={styles.signInLink}>
            Sign In
          </Link>
        </Text>
      </View>
    </Animated.View>
  )

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar style="dark" />
      
      <View style={styles.welcomeContainer}>
        <Text style={styles.hello}>Join Us</Text>
        <Text style={styles.welcomeBack}>Create Account</Text>
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
            <Text style={styles.formTitle}>
              {pendingVerification ? 'Almost There!' : 'Create Your Account'}
            </Text>
            <Text style={styles.formSubtitle}>
              {pendingVerification 
                ? 'Verify your email to complete registration' 
                : 'Fill in your details to get started'
              }
            </Text>
            
            {pendingVerification ? renderVerificationForm() : renderSignUpForm()}
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
  formTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2E4657',
    marginBottom: 8,
    fontFamily: Platform.OS === 'ios' ? 'Raleway-SemiBold' : 'sans-serif-medium',
  },
  formSubtitle: {
    fontSize: 14,
    color: '#7A8A97',
    marginBottom: 30,
    fontFamily: Platform.OS === 'ios' ? 'Raleway-Regular' : 'sans-serif',
  },
  formGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#2E4657',
    marginBottom: 8,
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
  inputError: {
    borderColor: '#E74C3C',
  },
  signUpButton: {
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
  verifyButton: {
    backgroundColor: '#5591BC',
    borderRadius: 12,
    marginTop: 30,
    height: 55,
    justifyContent: 'center',
    shadowColor: '#5591BC',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Raleway-SemiBold' : 'sans-serif-medium',
  },
  error: {
    color: '#E74C3C',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  helperText: {
    color: '#E74C3C',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
  signInLinkContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#7A8A97',
    fontFamily: Platform.OS === 'ios' ? 'Raleway-Regular' : 'sans-serif',
  },
  signInLink: {
    color: '#5591BC',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontFamily: Platform.OS === 'ios' ? 'Raleway-SemiBold' : 'sans-serif-medium',
  }
})