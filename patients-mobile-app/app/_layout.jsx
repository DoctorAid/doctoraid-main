import { Stack } from 'expo-router/stack';
import { ClerkProvider } from '@clerk/clerk-expo';

const Layout = () => {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "your_publishable_key";
  
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <Stack screenOptions={{ 
        headerShown: false,
        animation: 'none'
      }}>
        <Stack.Screen name="index" />
        <Stack.Screen 
          name="(Tabs)" 
          options={{
            headerShown: false,
            tabBarStyle: { display: 'none' }
          }}
        />
        <Stack.Screen name="UserOnboarding" />
        {/* Add other Stack.Screen components as needed */}
      </Stack>
    </ClerkProvider>
  );
}

export default Layout;