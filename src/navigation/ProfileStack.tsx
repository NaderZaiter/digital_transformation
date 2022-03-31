import React, {useRef} from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";

import {colors} from "../constants/palette";
import HealthRecordScreen from "../screens/ProfileScreen/HealthRecordScreen";
import EditProfileScreen from "../screens/ProfileScreen/EditProfileScreen";
import ProfileScreen from "../screens/ProfileScreen/ProfileScreen";
import MyDonationsScreen from "../screens/ProfileScreen/MyDonationsScreen";
import NewRequestScreen from "../screens/NewRequestScreen";

export function ProfileStack() {
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
        name="MyDonationsScreen"
        component={MyDonationsScreen}
        options={{
          title: "My donations",
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
    </RootStackNav.Navigator>
  );
}
