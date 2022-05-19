import { useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header, SubHeader, LastHeader, InJail } from "../../components";
import { ClubList } from "../../components/ClubList";
import { OwnClubList } from "../../components/OwnClubList";
import { BuyClubList } from "../../components/BuyClubList";
import { Loading, Text, View } from "../../components/PureComponents";
import Colors from "../../constants/Colors";
import Actions from "../../redux/actions";

export default function Club({ navigation }: any) {
  const dispatch = useDispatch();
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const loading = useSelector((state: any) => state.commonReducers.loading);
  const clubList = useSelector((state: any) => state.homepageReducers.clubList);
  const ownClubList = useSelector(
    (state: any) => state.homepageReducers.ownClubList
  );
  const randomClubList = useSelector(
    (state: any) => state.homepageReducers.randomClubList
  );
  const jailStatus = useSelector(
    (state: any) => state.homepageReducers.jailStatus
  );

  const initScreenCall = async () => {
    await dispatch(Actions.homepageActions.GetRandomClubList());
    await dispatch(Actions.homepageActions.GetOwnClubList());
    await dispatch(Actions.homepageActions.GetClubList());
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
          <Text style={{ marginLeft: 15, marginTop: 15 }}>Bir Kulübe gir</Text>
          <View style={{ flex: 1 }}>
            {ClubList(navigation, randomClubList)}
          </View>

          <Text style={{ marginLeft: 15, marginTop: 15 }}>
            Sahip olduğun Kulüpler
          </Text>
          <View style={{ flex: 1 }}>
            {OwnClubList(navigation, ownClubList)}
          </View>

          <Text style={{ marginLeft: 15, marginTop: 15 }}>
            Satın Alabileceğin Kulüpler
          </Text>
          <View style={{ flex: 1 }}>{BuyClubList(clubList)}</View>
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
