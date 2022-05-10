import { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header, SubHeader, LastHeader, EczaneList } from "../../components";
import { Loading, View } from "../../components/PureComponents";
import Colors from "../../constants/Colors";
import Actions from "../../redux/actions";

export default function Eczane({ navigation }: any) {
  const dispatch = useDispatch();
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const eczaneList =
    useSelector((state: any) => state.homepageReducers.eczaneList) || {};
  const loading = useSelector((state: any) => state.commonReducers.loading);
  const jailStatus = useSelector(
    (state: any) => state.homepageReducers.jailStatus
  );
  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };

  const initRobberyList = async () => {
    await dispatch(Actions.homepageActions.GetRobberyList());
    await dispatch(Actions.homepageActions.GetEczaneList());
  };

  useEffect(() => {
    initHeader();
    initRobberyList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Loading status={loading} />
      <View>{Header(characterInfo, navigation)}</View>
      <View>{SubHeader(characterInfo, navigation)}</View>
      <View>{LastHeader(characterInfo)}</View>
      <View style={{ flex: 1 }}>{EczaneList(eczaneList, jailStatus)}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGray,
  },
});
