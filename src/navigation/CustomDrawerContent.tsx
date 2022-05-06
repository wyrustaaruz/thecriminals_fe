import { Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { Text, View } from "../components/PureComponents";
import Actions from "../redux/actions";

type CustomDrawerItemType = {
  title: string;
  navigateTo?: string;
  status?: string;
  myFunction?: any;
};
export function CustomDrawerContent({ navigation }: any) {
  const CustomDrawerItem = ({
    navigateTo,
    title,
    status,
    myFunction,
  }: CustomDrawerItemType) => {
    return (
      <View style={{ borderBottomWidth: 1, marginTop: 10, paddingBottom: 10 }}>
        <TouchableOpacity
          style={{ alignSelf: "center" }}
          onPress={() => {
            navigation.toggleDrawer();
            if (status === "function") {
              myFunction();
            } else {
              navigation.navigate(navigateTo);
            }
          }}
        >
          <Text style={{ fontSize: 20 }}>{title}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const dispatch = useDispatch();
  return (
    <SafeAreaView>
      <CustomDrawerItem navigateTo="Home" title="Anasayfa" />
      <CustomDrawerItem navigateTo="ChatScreen" title="Chat" />
      <CustomDrawerItem navigateTo="Profile" title="Profil" />
      <CustomDrawerItem navigateTo="Messages" title="Mesajlar" />
      <CustomDrawerItem navigateTo="Friendship" title="Arkadaşlar" />
      <CustomDrawerItem navigateTo="Clan" title="Çete" />
      <CustomDrawerItem
        status="function"
        myFunction={() => dispatch(Actions.authActions.Logout())}
        title="Çıkış Yap"
      />
    </SafeAreaView>
  );
}
