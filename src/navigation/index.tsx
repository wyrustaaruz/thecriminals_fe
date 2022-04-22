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
import ModalScreen from "../screens/general/ModalScreen";
import NotFoundScreen from "../screens/general/NotFoundScreen";
import Splash from "../screens/general/Splash";
import Robbery from "../screens/home/Robbery";
import Club from "../screens/home/Club";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import ForgetPassword from "../screens/auth/ForgetPassword";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList, RootTabParamList } from "../../types";
import Actions from "../redux/actions";
import LinkingConfiguration from "./LinkingConfiguration";
import SelectAvatar from "../screens/home/SelectAvatar";

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
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const AuthStack = () => {
  return (
    <Stack.Navigator>
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
        name="SelectAvatar"
        component={SelectAvatar}
        options={{
          title: "Avatar Seç",
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
    </Stack.Navigator>
  );
};

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const token = useSelector((state: any) => state.authReducers.authToken);
  const [loading, setLoading] = React.useState(true);

  const dispatch = useDispatch();
  const init = async () => {
    await dispatch(Actions.authActions.Init());
    setLoading(false);
  };

  React.useEffect(() => {
    init();
  }, []);

  if (loading) {
    return (
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
    );
  }

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      {token === null ? <AuthStack /> : <RootNavigator />}
    </NavigationContainer>
  );
}
