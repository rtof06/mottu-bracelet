import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HeaderGearButton from "../components/HeaderGearButton";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerRight: () => <HeaderGearButton /> }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "Entrar" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Criar conta" }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Configurações" }}
      />
    </Stack.Navigator>
  );
}
