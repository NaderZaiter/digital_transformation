import React, { useRef} from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../constants/palette";
import { NavigationContainer } from "@react-navigation/native";
import { BudgetStack } from "./BudgetStack";
import { ImagesRightsStack } from "./ImagesRightsStack";
import { CollaboratorsStack } from "./CollaboratorsStack";
import { ProfileStack } from "./ProfileStack";
import { RemindersStack } from "./RemindersStack";
import { Text, View, StyleSheet, Image } from "react-native";

export function BottomTabs({ navigation }) {
  const BottomTabsNav = createBottomTabNavigator();
  const navigationRef = useRef(null);
  return (
    <NavigationContainer ref={navigationRef}>
      <BottomTabsNav.Navigator initialRouteName="BudgetsScreen" screenOptions={styles.screenOptions}>
        <BottomTabsNav.Screen
          name="BudgetStack"
          component={BudgetStack}
          options={{
            title: "Presupuestos",
            headerShown: false,
            tabBarIcon: ({ focused}) => (
              <View style={styles.view}>
                <Image
                  source={require("../../assets/budget-icon.png")}
                  resizeMode='contain'
                  style={{width: 25, height: 25, tintColor: focused ? colors.salmon : colors.iconGrey}}
                />
              </View>
            ),
          }}
        />
        <BottomTabsNav.Screen
          name="ImagesRightsStack"
          component={ImagesRightsStack}
          options={{
            title: "Imágenes",
            headerShown: false,
            tabBarIcon: ({ focused}) => (
              <View style={styles.view}>
                <Image
                  source={require("../../assets/imagen-icon.png")}
                  resizeMode='contain'
                  style={{width: 25, height: 25, tintColor: focused ? colors.salmon : colors.iconGrey}}
                />
              </View>
            ),
          }}
        />
        <BottomTabsNav.Screen
          name="CollaboratorsStack"
          component={CollaboratorsStack}
          options={{
            title: "Colaboradores",
            headerShown: false,
            tabBarIcon: ({ focused}) => (
              <View style={styles.view}>
                <Image
                  source={require("../../assets/collaborators-icon.png")}
                  resizeMode='contain'
                  style={{width: 25, height: 25, tintColor: focused ? colors.salmon : colors.iconGrey}}
                />
              </View>
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
            tabBarIcon: ({ focused}) => (
              <View style={styles.view}>
                <Image
                  source={require("../../assets/reminder-icon.png")}
                  resizeMode='contain'
                  style={{width: 25, height: 25, tintColor: focused ? colors.salmon : colors.iconGrey}}
                />
              </View>
            ),
          }}
        />
        <BottomTabsNav.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            title: "Perfil",
            headerShown: false,
            tabBarIcon: ({ focused}) => (
              <View style={styles.view}>
                <Image
                  source={require("../../assets/profile-icon.png")}
                  resizeMode='contain'
                  style={{width: 25, height: 25, tintColor: focused ? colors.salmon : colors.iconGrey}}
                />
              </View>
            ),
          }}
        />
      </BottomTabsNav.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  screenOptions: {
    tabBarActiveTintColor: colors.black,
    tabBarInactiveTintColor: colors.text,
    tabBarShowLabel: true,
    tabBarAllowFontScaling: false,
    tabBarHideOnKeyboard: true,
    tabBarLabelStyle: {
      fontWeight: "bold",
      fontSize: 10,
    },
  },
  view: {
    alignItems: "center",
    justifyContent: 'center',
    top: 2,
  },
});