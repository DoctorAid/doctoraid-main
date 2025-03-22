import { Stack } from 'expo-router';
import { TransitionPresets } from '@react-navigation/stack';

const UserOnboardingLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
        cardStyle: { backgroundColor: 'transparent' },
        transitionSpec: {
          open: {
            animation: 'timing',
            config: {
              duration: 350,
            },
          },
          close: {
            animation: 'timing',
            config: {
              duration: 350,
            },
          },
        },
        cardStyleInterpolator: ({ current, next, layouts }) => {
          return {
            cardStyle: {
              transform: [
                {
                  translateX: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
            overlayStyle: {
              opacity: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
              }),
            },
          };
        },
      }}
    >
      <Stack.Screen name="scene01" />
      <Stack.Screen name="scene03" />
    </Stack>
  );
};

export default UserOnboardingLayout;