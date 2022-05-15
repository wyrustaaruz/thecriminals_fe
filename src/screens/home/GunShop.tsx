import { useEffect } from "react";
import { StyleSheet, SafeAreaView, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header, SubHeader, LastHeader, Inventory } from "../../components";
import { Loading, Text, View } from "../../components/PureComponents";
import Colors from "../../constants/Colors";
import Actions from "../../redux/actions";

export default function GunShop({ navigation }: any) {
  const dispatch = useDispatch();
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const loading = useSelector((state: any) => state.commonReducers.loading);
  const jailStatus = useSelector(
    (state: any) => state.homepageReducers.jailStatus
  );
  const characterItemList = useSelector(
    (state: any) => state.homepageReducers.characterItemList
  );
  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };

  const initCharacterItemsList = async () => {
    await dispatch(Actions.homepageActions.GetCharacterItems());
  };

  useEffect(() => {
    initHeader();
    initCharacterItemsList();
  }, []);

  const jailGifs = [
    require("../../../assets/lotties/jail.gif"),
    require("../../../assets/lotties/jail2.gif"),
  ];
  let randJailIndex = Math.floor(Math.random() * jailGifs.length);

  return (
    <SafeAreaView style={styles.container}>
      <Loading status={loading} />
      <View>{Header(characterInfo, navigation)}</View>
      <View>{SubHeader(characterInfo, navigation)}</View>
      <View>{LastHeader(characterInfo)}</View>
      <Text style={{ marginLeft: 15, marginTop: 15 }}>
        Sahip olduğun Eşyalar
      </Text>
      <View style={{ flex: 1 }}>
        {jailStatus.block ? (
          <View
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: Colors.LightGray,
              padding: 20,
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: "100%", height: "40%" }}
              source={jailGifs[randJailIndex]}
            />
            <Text style={{ marginTop: 20, textAlign: "center" }}>
              {jailStatus.message}
            </Text>
          </View>
        ) : (
          Inventory(characterItemList)
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGray,
  },
});
