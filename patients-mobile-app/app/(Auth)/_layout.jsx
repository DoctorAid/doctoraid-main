// app/(Auth)/_layout.jsx
import { Stack } from 'expo-router/stack';
import { useAuth } from '@clerk/clerk-expo';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function AuthLayout() {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  
  // Redirect to home if already signed in
  useEffect(() => {
    if (isSignedIn) {
      router.replace('../(Tabs)/home');
    }
  }, [isSignedIn]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sign-in" />
      <Stack.Screen name="Sign-up" />
    </Stack>
  );
}