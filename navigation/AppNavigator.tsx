import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import MotorcycleListScreen from '../screens/MotorcycleListScreen';
// import { PhotoCaptureScreenPlaceholder } from '../screens/PhotoCaptureScreen';
import { AppStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MotorcycleList"
        component={MotorcycleListScreen}
        options={{ title: 'Mottu Bracelet' }}
      />
      <Stack.Screen
        name="PhotoCapture"
        component={PhotoCaptureScreenPlaceholder}
        options={{ title: 'Tirar foto' }}
      />
    </Stack.Navigator>
  );
}
