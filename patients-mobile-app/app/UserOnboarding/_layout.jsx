import { Stack } from 'expo-router/stack';

const UserOnboardingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="scene01" options={{ headerShown: false }} />
      <Stack.Screen name="scene02" options={{ headerShown: false }} />
      <Stack.Screen name="scene03" options={{ headerShown: false }} />
    </Stack>
  );
}

export default UserOnboardingLayout;