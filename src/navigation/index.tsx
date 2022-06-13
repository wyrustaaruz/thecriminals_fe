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
import Bank from "../screens/home/Bank";
import Club from "../screens/home/Club";
import InClub from "../screens/home/InClub";
import Buildings from "../screens/home/Buildings";
import Eczane from "../screens/home/Eczane";
import GunShop from "../screens/home/GunShop";
import Clan from "../screens/home/Clan";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import ForgetPassword from "../screens/auth/ForgetPassword";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList, RootTabParamList } from "../../types";
import Actions from "../redux/actions";
import LinkingConfiguration from "./LinkingConfiguration";
import SelectAvatar from "../screens/auth/SelectAvatar";
import ChatScreen from "../screens/home/ChatScreen";
import Profile from "../screens/home/Profile";
import Messages from "../screens/home/Messages";
import Friendship from "../screens/home/Friendship";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "./CustomDrawerContent";
import { Ionicons } from "@expo/vector-icons";

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerType: "back",
        drawerStyle: { width: "50%", backgroundColor: Colors.DarkGray },
        overlayColor: "transparent",
        headerShown: false,
        drawerPosition: "right",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={RootNavigator} />
      <Drawer.Screen name="ChatScreen" component={ChatScreen} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Messages" component={Messages} />
      <Drawer.Screen name="Friendship" component={Friendship} />
      <Drawer.Screen name="Clan" component={Clan} />
    </Drawer.Navigator>
  );
}
function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      sceneContainerStyle={{ backgroundColor: "464646" }}
      initialRouteName="Robbery"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarIconStyle: {},
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
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="walk-outline"
                size={25}
                color={
                  tabInfo.focused ? Colors.custom.tint : Colors.custom.tabIconDefault
                }
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Club"
        component={Club}
        options={{
          title: "Kulüp",
          headerShown: false,
          tabBarStyle: { backgroundColor: Colors.custom.background },
          tabBarActiveBackgroundColor: Colors.custom.background,
          tabBarInactiveBackgroundColor: Colors.custom.background,
          tabBarActiveTintColor: Colors.custom.tint,
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="beer-outline"
                size={25}
                color={tabInfo.focused ? Colors.custom.tint : Colors.custom.tabIconDefault}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Buildings"
        component={Buildings}
        options={{
          title: "Binalar",
          headerShown: false,
          tabBarStyle: { backgroundColor: Colors.custom.background },
          tabBarActiveBackgroundColor: Colors.custom.background,
          tabBarInactiveBackgroundColor: Colors.custom.background,
          tabBarActiveTintColor: Colors.custom.tint,
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="business-outline"
                size={25}
                color={tabInfo.focused ? Colors.custom.tint : Colors.custom.tabIconDefault}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Eczane"
        component={Eczane}
        options={{
          title: "Eczane",
          headerShown: false,
          tabBarStyle: { backgroundColor: Colors.custom.background },
          tabBarActiveBackgroundColor: Colors.custom.background,
          tabBarInactiveBackgroundColor: Colors.custom.background,
          tabBarActiveTintColor: Colors.custom.tint,
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="medkit-outline"
                size={25}
                color={tabInfo.focused ? Colors.custom.tint : Colors.custom.tabIconDefault}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Bank"
        component={Bank}
        options={{
          title: "Banka",
          headerShown: false,
          tabBarStyle: { backgroundColor: Colors.custom.background },
          tabBarActiveBackgroundColor: Colors.custom.background,
          tabBarInactiveBackgroundColor: Colors.custom.background,
          tabBarActiveTintColor: Colors.custom.tint,
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="cash-outline"
                size={25}
                color={tabInfo.focused ? Colors.custom.tint : Colors.custom.tabIconDefault}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="GunStore"
        component={GunShop}
        options={{
          title: "Tüccar",
          headerShown: false,
          tabBarStyle: { backgroundColor: Colors.custom.background },
          tabBarActiveBackgroundColor: Colors.custom.background,
          tabBarInactiveBackgroundColor: Colors.custom.background,
          tabBarActiveTintColor: Colors.custom.tint,
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="hammer-outline"
                size={25}
                color={tabInfo.focused ? Colors.custom.tint : Colors.custom.tabIconDefault}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const customHeader = {
  headerStyle: {
    backgroundColor: Colors.LightGray,
  },
  headerTintColor: Colors.Gold,
  headerBackTitle: "",
};
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
        options={{
          ...customHeader,
          title: "Oops!",
        }}
      />
      <Stack.Screen
        name="InClub"
        component={InClub}
        options={{
          ...customHeader,
          title: "Kulüp",
        }}
      />
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          ...customHeader,
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
            backgroundColor: Colors.Gold,
          },
          headerTintColor: Colors.White,
        }}
      />
      <Stack.Screen
        name="SelectAvatar"
        component={SelectAvatar}
        options={{
          title: "Avatar Seç",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: Colors.Gold,
          },
          headerTintColor: Colors.White,
        }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          title: "Şifre Unuttum",
          headerBackTitleVisible: false,
          headerStyle: {
            backgroundColor: Colors.Gold,
          },
          headerTintColor: Colors.White,
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
      {token === null ? <AuthStack /> : <MyDrawer />}
    </NavigationContainer>
  );
}
