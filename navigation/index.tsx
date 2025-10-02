import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import SplashScreen from '../screens/SplashScreen';
import { useSession } from '../theme';

export type RootStackParamList = {
  Splash: undefined;
  App: undefined;
  Auth: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="App" component={AppNavigator} />
      <Stack.Screen name="Auth" component={AuthNavigator} />
    </Stack.Navigator>
  );
}
