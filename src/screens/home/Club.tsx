import { useEffect } from "react";
import { StyleSheet, SafeAreaView, ScrollView, Image } from "react-native";
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
  const randomClubList = useSelector(
    (state: any) => state.homepageReducers.randomClubList
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
  const initRandomClubs = async () => {
    await dispatch(Actions.homepageActions.GetRandomClubList());
  };

  const initOwnClubs = async () => {
    await dispatch(Actions.homepageActions.GetOwnClubList());
  };

  useEffect(() => {
    initHeader();
    initRandomClubs();
    initClubs();
    initOwnClubs();
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
