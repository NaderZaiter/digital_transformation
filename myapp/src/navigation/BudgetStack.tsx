import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { colors } from "../constants/palette";
import BudgetsScreen from "../screens/BudgetsScreen";
import AddBudgetScreen from "../screens/AddBudgetScreen";
import ModifyBudgetScreen from "../screens/ModifyBudgetScreen";

export function BudgetStack() {
  const RootStackNav = createStackNavigator();

  return (
    <RootStackNav.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white
        }
      }}
    >
      <RootStackNav.Screen name="BudgetsScreen"
        component={BudgetsScreen}
        options={{
          title: "Presupuestos",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }} />
      <RootStackNav.Screen name="AddBudgetScreen"
        component={AddBudgetScreen}
        options={{
          title: "Nuevo presupuesto",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }} />
        <RootStackNav.Screen name="ModifyBudgetScreen"
        component={ModifyBudgetScreen}
        options={{
          title: "Modificar presupuesto",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }} />
    </RootStackNav.Navigator>
  );
}
