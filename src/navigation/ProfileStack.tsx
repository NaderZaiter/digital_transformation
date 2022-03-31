import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../constants/palette";
import EditProfileScreen from "../screens/ProfileScreen/EditProfileScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import AddBudgetScreen from "../screens/AddBudgetScreen";

export function ProfileStack() {
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />

      <RootStackNav.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          title: "Edit profile",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />

    </RootStackNav.Navigator>
  );
}
