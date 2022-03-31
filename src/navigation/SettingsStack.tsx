import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

export function SettingsStack() {
  const RootStackNav = createStackNavigator();
  return (
    <RootStackNav.Navigator>
      <RootStackNav.Screen name="LoginScreen"
        component={LoginScreen} />
      <RootStackNav.Screen name="RegisterScreen"
        component={RegisterScreen} />
    </RootStackNav.Navigator>
  );
}
