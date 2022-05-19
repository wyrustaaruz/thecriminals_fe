import { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Header,
  SubHeader,
  LastHeader,
  Inventory,
  InJail,
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
          <InJail
            myCallbackList={() => [initCharacterItemsList(), initHeader()]}
          />
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
