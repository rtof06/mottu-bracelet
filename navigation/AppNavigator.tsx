import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MotoListScreen from '../screens/MotoListScreen';
import MotoCreateScreen from '../screens/MotoCreateScreen';
import MotoDetailScreen from '../screens/MotoDetailScreen';
import MotoEditScreen from '../screens/MotoEditScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CameraScreen from '../screens/CameraScreen';
import { AppStackParamList } from './navigation.types';
import HeaderGearButton from '../components/HeaderGearButton';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerRight: () => <HeaderGearButton /> }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
      <Stack.Screen name="MotoList" component={MotoListScreen} options={{ title: 'Minhas Motos' }} />
      <Stack.Screen name="CreateMoto" component={MotoCreateScreen} options={{ title: 'Cadastrar Moto' }} />
      <Stack.Screen name="MotoDetail" component={MotoDetailScreen} options={{ title: 'Detalhes da Moto' }} />
      <Stack.Screen name="EditMoto" component={MotoEditScreen} options={{ title: 'Editar Moto' }} />
      <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Tirar foto' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
    </Stack.Navigator>
  );
}
