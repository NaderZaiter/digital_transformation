import React, {useRef} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import {colors} from "../constants/palette";
import FulfilledScreen from "../screens/RequestScreen/RequestFulfilledScreen/FulfilledScreen";
import RequestDonatorsScreen from "../screens/RequestScreen/RequestFulfilledScreen/RequestDonatorsScreen";
import InProgressScreen from "../screens/RequestScreen/RequestInProgressScreen/InProgressScreen";
import RequestsScreen from "../screens/RequestScreen/RequestInProgressScreen/RequestsScreen";
import NewRequestScreen from "../screens/NewRequestScreen";
import HealthRecordScreen from "../screens/ProfileScreen/HealthRecordScreen";

export function RequestsStack() {
  const RootStackNav = createStackNavigator();
  const navigationRef = useRef(null);

  return (
    <RootStackNav.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <RootStackNav.Screen
        name="InProgressScreen"
        component={InProgressScreen}
        options={{
          title: "Derechos imágen",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />

      <RootStackNav.Screen
        name="RequestsScreen"
        component={RequestsScreen}
        options={{
          title: "Requests",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: "#F47174",
          },
        }}
      />

      <RootStackNav.Screen
        name="FulfilledScreen"
        component={FulfilledScreen}
        options={{
          title: "Fulfilled requests",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: "#F47174",
          },
        }}
      />

      <RootStackNav.Screen
        name="RequestDonatorsScreen"
        component={RequestDonatorsScreen}
        options={{
          title: "Donators",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: "#F47174",
          },
        }}
      />

      <RootStackNav.Screen
        name="NewRequestScreen"
        component={NewRequestScreen}
        options={{
          title: "New request",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />

      <RootStackNav.Screen
        name="HealthRecordScreen"
        component={HealthRecordScreen}
        options={{
          title: "Health record",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />
    </RootStackNav.Navigator>
  );
}
