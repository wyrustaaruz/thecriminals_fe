import { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header, SubHeader, LastHeader } from "../../components";
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
  const jailStatus = useSelector(
    (state: any) => state.homepageReducers.jailStatus
  );

  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };

  const initClubs = async () => {
    await dispatch(Actions.homepageActions.GetClubList());
  };

  const initOwnClubs = async () => {
    await dispatch(Actions.homepageActions.GetOwnClubList());
  };

  useEffect(() => {
    initHeader();
    initClubs();
    initOwnClubs();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Loading status={loading} />
      <View>{Header(characterInfo, navigation)}</View>
      <View>{SubHeader(characterInfo, navigation)}</View>
      <View>{LastHeader(characterInfo)}</View>
      <Text style={{ marginLeft: 15, marginTop: 15 }}>Bir Kulübe gir</Text>
      <View style={{ flex: 1 }}>
        {ClubList(navigation, clubList, jailStatus)}
      </View>

      <Text style={{ marginLeft: 15, marginTop: 15 }}>
        Sahip olduğun Kulüpler
      </Text>
      <View style={{ flex: 1 }}>
        {OwnClubList(navigation, ownClubList, jailStatus)}
      </View>

      <Text style={{ marginLeft: 15, marginTop: 15 }}>
        Satın Alabileceğin Kulüpler
      </Text>
      <View style={{ flex: 1 }}>{BuyClubList(clubList, jailStatus)}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGray,
  },
});
