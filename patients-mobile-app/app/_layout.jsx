import { Stack } from 'expo-router/stack';
import { ClerkProvider } from '@clerk/clerk-expo';

const Layout = () => {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "your_publishable_key";
  
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(Tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="UserOnboarding" options={{ headerShown: false }} />
        {/* Add other Stack.Screen components as needed */}
      </Stack>
    </ClerkProvider>
  );
}

export default Layout;