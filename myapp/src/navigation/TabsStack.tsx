import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../constants/palette";
import { NavigationContainer } from "@react-navigation/native";
import { BudgetStack } from "./BudgetStack";
import { ImagesRightsStack } from "./ImagesRightsStack";
import { CollaboratorsStack } from "./CollaboratorsStack";
import { ProfileStack } from "./ProfileStack";
import { RemindersStack } from "./RemindersStack";

export function BottomTabs({ navigation }) {
  const BottomTabsNav = createBottomTabNavigator();
  const navigationRef = React.useRef(null);
  return (
    <NavigationContainer ref={navigationRef}>
      <BottomTabsNav.Navigator
        initialRouteName="BudgetsScreen"
        screenOptions={{
          tabBarActiveTintColor: colors.black,
          tabBarInactiveTintColor: colors.text,
          tabBarShowLabel: true,
          tabBarAllowFontScaling: false,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontWeight: "bold",
            fontSize: 10,
          },
        }}
      >
        <BottomTabsNav.Screen
          name="BudgetStack"
          component={BudgetStack}
          options={{
            title: "Presupuestos",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={"blood-bag"}
                size={28}
                color={color}
              />
            ),
          }}
        />
        <BottomTabsNav.Screen
          name="ImagesRightsStack"
          component={ImagesRightsStack}
          options={{
            title: "Imágenes",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={"card-plus"}
                size={28}
                color={color}
              />
            ),
          }}
        />
        <BottomTabsNav.Screen
          name="CollaboratorsStack"
          component={CollaboratorsStack}
          options={{
            title: "Colaboradores",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name={"map"} size={28} color={color} />
            ),
          }}
        />
        <BottomTabsNav.Screen
          name="RemindersStack"
          component={RemindersStack}
          options={{
            title: "Recordatorios",
            headerShown: false,
            headerStyle: {
              backgroundColor: colors.primary,
            },
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons name={"bell"} size={28} color={color} />
            ),
          }}
        />
        <BottomTabsNav.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            title: "Perfil",
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => (
              <MaterialCommunityIcons
                name={"account"}
                size={28}
                color={color}
              />
            ),
          }}
        />
      </BottomTabsNav.Navigator>
    </NavigationContainer>
  );
}
