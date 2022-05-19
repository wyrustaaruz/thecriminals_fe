import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  Header,
  SubHeader,
  LastHeader,
  RobberyList,
  InJail,
} from "../../components";
import { Loading, View } from "../../components/PureComponents";
import Colors from "../../constants/Colors";
import Actions from "../../redux/actions";

export default function Robbery({ navigation }: any) {
  const dispatch = useDispatch();
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const robberyList =
    useSelector((state: any) => state.homepageReducers.robberyList) || {};
  const loading = useSelector((state: any) => state.commonReducers.loading);
  const jailStatus = useSelector(
    (state: any) => state.homepageReducers.jailStatus
  );

  const initScreenCall = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
    await dispatch(Actions.homepageActions.GetRobberyList());
  };

  useEffect(() => {
    initScreenCall();
  }, []);

  const ConditionalRender = () => {
    return jailStatus.block ? (
      <InJail myCallbackList={() => [initScreenCall()]} />
    ) : (
      <RobberyList robberyList={robberyList} />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Loading status={loading} />
      <View>{Header(characterInfo, navigation)}</View>
      <View>{SubHeader(characterInfo, navigation)}</View>
      <View>{LastHeader(characterInfo)}</View>
      <View style={{ flex: 1 }}>{ConditionalRender()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGray,
  },
});
