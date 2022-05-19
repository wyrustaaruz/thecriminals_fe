import { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Header,
  SubHeader,
  LastHeader,
  EczaneList,
  InJail,
} from "../../components";
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

  const initScreenCall = async () => {
    await dispatch(Actions.homepageActions.GetRobberyList());
    await dispatch(Actions.homepageActions.GetEczaneList());
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
        <View style={{ flex: 1 }}>{EczaneList(eczaneList)}</View>
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
