import { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header, SubHeader, LastHeader } from "../../components";
import { Loading, Text, View } from "../../components/PureComponents";
import Colors from "../../constants/Colors";
import Actions from "../../redux/actions";

export default function InClub(props: any, { navigation }: any) {
  const { clubId } = props.route.params;
  console.log("clubId", clubId);
  const dispatch = useDispatch();
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const loading = useSelector((state: any) => state.commonReducers.loading);

  const clubItems = useSelector(
    (state: any) => state.homepageReducers.clubItems
  );
  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };

  const initClubItems = async () => {
    await dispatch(Actions.homepageActions.GetClubItems(clubId));
  };

  useEffect(() => {
    initHeader();
    initClubItems();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Loading status={loading} />
      <View>{Header(characterInfo, navigation)}</View>
      <View>{SubHeader(characterInfo, navigation)}</View>
      <View>{LastHeader(characterInfo)}</View>
      <View style={{ flex: 1 }}>
        <Text>Kulüp içi</Text>
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
