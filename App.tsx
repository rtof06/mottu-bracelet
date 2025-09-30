// src/App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation';
import { useColorScheme, StatusBar } from 'react-native';
import { ThemeProvider } from './theme';

export default function App() {
  const scheme = useColorScheme();
  return (
    <ThemeProvider scheme={scheme || 'light'}>
      <NavigationContainer>
        <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
        <RootNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
}
