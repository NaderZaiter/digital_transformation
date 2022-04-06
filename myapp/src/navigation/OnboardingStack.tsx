import React, { useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { colors } from "../constants/palette";
import SplashScreen from "../screens/SplashScreen";

export function OnboardingStack() {
  const RootStackNav = createStackNavigator();
  const navigationRef = useRef(null);

  return (
    <NavigationContainer ref={navigationRef} >
      <RootStackNav.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          cardStyle: {
            backgroundColor: colors.white
          }
        }}
      >
        <RootStackNav.Screen name="SplashScreen"
          component={SplashScreen}
          options={{
            title: "Team production",
            headerTintColor: colors.white,
            headerStyle: {
              backgroundColor: colors.primary,
            }
          }} />

        <RootStackNav.Screen name="LoginScreen"
          component={LoginScreen}
          options={{
            title: "Log in",
            headerTintColor: colors.white,
            headerStyle: {
              backgroundColor: colors.primary
            }
          }} />

        <RootStackNav.Screen name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: "Sign up",
            headerTintColor: colors.white,
            headerStyle: {
              backgroundColor: colors.primary
            }
          }} />

      </RootStackNav.Navigator>
    </NavigationContainer>
  );
}
