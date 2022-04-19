import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ColorSchemeName } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import Splash from "../screens/Splash";
import Robbery from "../screens/Robbery";
import Club from "../screens/Club";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import ForgetPassword from "../screens/auth/ForgetPassword";
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
      {false ? (
        // We haven't finished checking for the token yet
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
      ) : true ? (
        // No token found, user isn't signed in
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title: "Giriş Yap",
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{
              title: "Kayıt Ol",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#C0B184",
              },
              headerTintColor: "#fff",
            }}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{
              title: "Şifre Unuttum",
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#C0B184",
              },
              headerTintColor: "#fff",
            }}
          />
        </>
      ) : (
        // User is signed in
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      )}

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
      sceneContainerStyle={{ backgroundColor: "464646" }}
      initialRouteName="Robbery"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarIconStyle: { display: "none" },
        tabBarItemStyle: { justifyContent: "center" },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <BottomTab.Screen
        name="Robbery"
        component={Robbery}
        options={{
          title: "Soygun",
          headerShown: false,
          tabBarStyle: { backgroundColor: Colors.custom.background },
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
          tabBarStyle: { backgroundColor: Colors.custom.background },
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
          tabBarStyle: { backgroundColor: Colors.custom.background },
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
          tabBarStyle: { backgroundColor: Colors.custom.background },
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
          tabBarStyle: { backgroundColor: Colors.custom.background },
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
          tabBarStyle: { backgroundColor: Colors.custom.background },
          tabBarActiveBackgroundColor: Colors.custom.background,
          tabBarInactiveBackgroundColor: Colors.custom.background,
          tabBarActiveTintColor: Colors.custom.tint,
        }}
      />
    </BottomTab.Navigator>
  );
}
