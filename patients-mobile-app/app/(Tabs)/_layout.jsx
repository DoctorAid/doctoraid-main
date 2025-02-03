import { Stack } from 'expo-router/stack';

const Layout = () => {
  return (
    <Stack >
       <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(Tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default Layout;
