import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../constants/palette";
import collaboratorsScreen from "../screens/collaboratorsScreen";

export function CollaboratorsStack() {
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
        name="collaboratorsScreen"
        component={collaboratorsScreen}
        options={{
          title: "Colaboradores",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
      />
    </RootStackNav.Navigator>
  );
}
