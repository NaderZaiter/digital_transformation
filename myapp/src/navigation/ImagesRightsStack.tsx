import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../constants/palette";
import ImagesRightsScreen from "../screens/ImagesRightsScreen";
import AddOrModifyImageRightsScreen from "../screens/AddOrModifyImageRightsScreen";

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
