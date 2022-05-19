import { useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header, SubHeader, LastHeader, InJail } from "../../components";
import { BuildList } from "../../components/BuildList";
import { Loading, Text, View } from "../../components/PureComponents";
import Colors from "../../constants/Colors";
import Actions from "../../redux/actions";

export default function Buildings({ navigation }: any) {
  const dispatch = useDispatch();
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const loading = useSelector((state: any) => state.commonReducers.loading);
  const buildList = useSelector(
    (state: any) => state.homepageReducers.buildList
  );
  const ownBuildList = useSelector(
    (state: any) => state.homepageReducers.ownBuildList
  );
  const jailStatus = useSelector(
    (state: any) => state.homepageReducers.jailStatus
  );

  const initScreenCall = async () => {
    await dispatch(Actions.homepageActions.GetOwnBuildList());
    await dispatch(Actions.homepageActions.GetBuildList());
    await dispatch(Actions.homepageActions.GetHeader());
  };

  useEffect(() => {
    initScreenCall();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Loading status={loading} />
      <View>{Header(characterInfo, navigation)}</View>
      <View>{SubHeader(characterInfo, navigation)}</View>
      <View>{LastHeader(characterInfo)}</View>
      {jailStatus.block ? (
        <InJail myCallbackList={() => [initScreenCall()]} />
      ) : (
        <ScrollView>
          <Text style={{ marginLeft: 15, marginTop: 15 }}>
            Sahip olduğun Binalar
          </Text>
          <View style={{ flex: 1 }}>{BuildList(ownBuildList, false)}</View>
          <Text style={{ marginLeft: 15, marginVertical: 15 }}>
            Yeni Bina Al
          </Text>
          <View style={{ flex: 1 }}>{BuildList(buildList, true)}</View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGray,
  },
});
