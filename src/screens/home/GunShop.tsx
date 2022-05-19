import { useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Header,
  SubHeader,
  LastHeader,
  Inventory,
  InJail,
  Trader,
} from "../../components";
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
  const traderItemList = useSelector(
    (state: any) => state.homepageReducers.traderItemList
  );

  const initScreenCall = async () => {
    await dispatch(Actions.homepageActions.GetCharacterItems());
    await dispatch(Actions.homepageActions.GetTraderItems());
    await dispatch(Actions.homepageActions.GetRobberyList());
    await dispatch(Actions.homepageActions.GetHeader());
  };

  useEffect(() => {
    initScreenCall();
  }, []);

  const InventoryComponent = () => {
    return (
      <ScrollView>
        <Text style={{ marginLeft: 15, marginTop: 15 }}>
          Sahip olduğun Eşyalar
        </Text>
        {Inventory(characterItemList)}
        <Text style={{ marginLeft: 15, marginTop: 15 }}>
          Satıcıdaki Ürünler
        </Text>
        {Trader(traderItemList)}
      </ScrollView>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loading status={loading} />
      <View>{Header(characterInfo, navigation)}</View>
      <View>{SubHeader(characterInfo, navigation)}</View>
      <View>{LastHeader(characterInfo)}</View>

      <View style={{ flex: 1 }}>
        {jailStatus.block ? (
          <InJail myCallbackList={() => [initScreenCall()]} />
        ) : (
          <InventoryComponent />
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
