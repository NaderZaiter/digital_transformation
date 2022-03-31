import React, {useRef} from "react";
import {createStackNavigator} from "@react-navigation/stack";

import {colors} from "../constants/palette";
import MapScreen from "../screens/MapScreen";

export function MapStack() {
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
        name="MapScreen"
        component={MapScreen}
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
