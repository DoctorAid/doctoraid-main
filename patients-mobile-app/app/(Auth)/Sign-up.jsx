import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Button, HelperText } from 'react-native-paper'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'

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
  
  // Check if passwords match
  React.useEffect(() => {
    if (confirmPassword.length > 0) {
      setPasswordsMatch(password === confirmPassword)
    } else {
      setPasswordsMatch(true)
    }
  }, [password, confirmPassword])

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
      setPendingVerification(true)
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
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('../(Tabs)/home')
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      setError('Verification failed. Check your code and try again.')
      console.error(JSON.stringify(err, null, 2))
    }
    
    setLoading(false)
  }

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text variant="headlineLarge" style={styles.title}>
          Verify Email
        </Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <TextInput
          mode="outlined"
          label="Verification Code"
          value={code}
          onChangeText={setCode}
          style={styles.input}
        />
        <Button mode="contained" onPress={onVerifyPress} loading={loading} style={styles.button}>
          Verify
        </Button>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Sign Up
      </Text>
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      <TextInput
        mode="outlined"
        label="Email"
        autoCapitalize="none"
        value={emailAddress}
        onChangeText={setEmailAddress}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        label="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        error={!passwordsMatch}
      />
      {!passwordsMatch && (
        <HelperText type="error" visible={!passwordsMatch} style={styles.helperText}>
          Passwords don't match
        </HelperText>
      )}
      
      <Button 
        mode="contained" 
        onPress={onSignUpPress} 
        loading={loading} 
        style={styles.button}
        disabled={!passwordsMatch || !password || !emailAddress || !confirmPassword}
      >
        Continue
      </Button>
    </View>
  )
}

// Styled Components (Only CSS Updated)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#C9E4F3',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#333',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  button: {
    width: '100%',
    paddingVertical: 8,
    backgroundColor: '#007bff',
    borderRadius: 8,
    fontWeight: 'bold',
    fontColor: '#fff',
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  helperText: {
    width: '100%',
    marginTop: -8,
    marginBottom: 8,
  },
})