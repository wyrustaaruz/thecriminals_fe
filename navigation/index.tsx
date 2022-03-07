import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import Robbery from "../screens/Robbery";
import Club from "../screens/Club";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Robbery"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarIconStyle: { display: "none" },
        tabBarLabelStyle: {},
      }}
    >
      <BottomTab.Screen
        name="Robbery"
        component={Robbery}
        options={{
          title: "Soygun",
          headerShown: false,
          tabBarActiveBackgroundColor: Colors.custom.background,
          tabBarInactiveBackgroundColor: Colors.custom.background,
          tabBarActiveTintColor: Colors.custom.tint,
        }}
      />
      <BottomTab.Screen
        name="Club"
        component={Club}
        options={{
          title: "Kulüp",
          tabBarActiveBackgroundColor: Colors.custom.background,
          tabBarInactiveBackgroundColor: Colors.custom.background,
          tabBarActiveTintColor: Colors.custom.tint,
        }}
      />
      <BottomTab.Screen
        name="Enjoy"
        component={Club}
        options={{
          title: "Eğlence",
          tabBarActiveBackgroundColor: Colors.custom.background,
          tabBarInactiveBackgroundColor: Colors.custom.background,
          tabBarActiveTintColor: Colors.custom.tint,
        }}
      />
      <BottomTab.Screen
        name="Hospital"
        component={Club}
        options={{
          title: "Hastahane",
          tabBarActiveBackgroundColor: Colors.custom.background,
          tabBarInactiveBackgroundColor: Colors.custom.background,
          tabBarActiveTintColor: Colors.custom.tint,
        }}
      />
      <BottomTab.Screen
        name="Bank"
        component={Club}
        options={{
          title: "Banka",
          tabBarActiveBackgroundColor: Colors.custom.background,
          tabBarInactiveBackgroundColor: Colors.custom.background,
          tabBarActiveTintColor: Colors.custom.tint,
        }}
      />
      <BottomTab.Screen
        name="GunStore"
        component={Club}
        options={{
          title: "Silahçı",
          tabBarActiveBackgroundColor: Colors.custom.background,
          tabBarInactiveBackgroundColor: Colors.custom.background,
          tabBarActiveTintColor: Colors.custom.tint,
        }}
      />
    </BottomTab.Navigator>
  );
}
