import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../constants/palette";
import AddBudgetScreen from "../screens/AddBudgetScreen";
import ImagesRightsScreen from "../screens/ImagesRightsScreen";

export function ImagesRightsStack() {
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
        name="ImagesRightsScreen"
        component={ImagesRightsScreen}
        options={{
          title: "Derechos imágen",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />

    </RootStackNav.Navigator>
  );
}
