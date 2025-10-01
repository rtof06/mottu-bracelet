import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MotoListScreen from '../screens/MotoListScreen';
import { CameraScreenPlaceholder } from '../screens/CameraScreen';
import { AppStackParamList } from './navigation.types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Início' }}
      />
      <Stack.Screen
        name="MotoList"
        component={MotoListScreen}
        options={{ title: 'Minhas Motos' }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraScreenPlaceholder}
        options={{ title: 'Tirar foto' }}
      />
    </Stack.Navigator>
  );
}