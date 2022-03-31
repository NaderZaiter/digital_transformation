import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../constants/palette";
import RemindersScreen from "../screens/RemindersScreen";
import AddBudgetScreen from "../screens/AddBudgetScreen";

export function RemindersStack() {
  const RootStackNav = createStackNavigator();

  return (
    <RootStackNav.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <RootStackNav.Screen
        name="RemindersScreen"
        component={RemindersScreen}
        options={{
          title: "Recordatorios",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />

      <RootStackNav.Screen
        name="AddBudgetScreen"
        component={AddBudgetScreen}
        options={{
          title: "Nuevo presupuesto",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />
    </RootStackNav.Navigator>
  );
}
