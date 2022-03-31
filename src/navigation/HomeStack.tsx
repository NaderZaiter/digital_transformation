import React, {useRef} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import {colors} from "../constants/palette";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import RequestViewScreen from "../screens/HomeScreen/RequestViewScreen";
import NewRequestScreen from "../screens/NewRequestScreen";

export function HomeStack() {
  const RootStackNav = createStackNavigator();
  const navigationRef = useRef(null);

  return (
    <RootStackNav.Navigator
    screenOptions={{
      cardStyle:{
        backgroundColor: colors.white
      }
    }}
    >

      <RootStackNav.Screen name="HomeScreen" 
      component={HomeScreen}
      options={{
        title: "Presupuestos",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.primary
        }
      }} />

      <RootStackNav.Screen name="RequestViewScreen" 
      component={RequestViewScreen}
      options={{
        title: "Request",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.primary
        }
      }} />
      
      <RootStackNav.Screen name="NewRequestScreen" 
      component={NewRequestScreen}
      options={{
        title: "New request",
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.primary
        }
      }} />
          
    </RootStackNav.Navigator>
  );
}
