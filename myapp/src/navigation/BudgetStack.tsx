import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { colors } from "../constants/palette";
import BudgetsScreen from "../screens/BudgetsScreen";
import AddBudgetScreen from "../screens/AddBudgetScreen";
import AddOrModifyTaskScreen from "../screens/AddOrModifyTaskScreen";
import AddOrModifyImageRightsScreen from "../screens/AddOrModifyImageRightsScreen";

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
          title: "Agregar/modificar presupuesto",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }} />
        <RootStackNav.Screen name="AddOrModifyTaskScreen"
        component={AddOrModifyTaskScreen}
        options={{
          title: "Agregar/modificar tarea",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }} />
        <RootStackNav.Screen name="AddOrModifyImageRightsScreen"
        component={AddOrModifyImageRightsScreen}
        options={{
          title: "Agregar/modificar derechos imágen",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary
          }
        }} />
    </RootStackNav.Navigator>
  );
}
