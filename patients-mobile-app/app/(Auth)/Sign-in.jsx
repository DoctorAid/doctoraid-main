import React from 'react'
import { View, StyleSheet } from 'react-native'
import { TextInput, Button, Text } from 'react-native-paper'
import { useSignIn } from '@clerk/clerk-expo'
import { useRouter, Link } from 'expo-router'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

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
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('../(Tabs)/home')
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
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        Sign In
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

      <Button
        mode="contained"
        onPress={onSignInPress}
        loading={loading}
        style={styles.button}
      >
        Sign In
      </Button>

      <Text style={styles.footerText}>
        Don't have an account?{' '}
        <Link href="./Sign-up" style={styles.link}>
          Sign up
        </Link>
      </Text>
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
  },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: '#666',
  },
  link: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
})
