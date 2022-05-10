import { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header, SubHeader, LastHeader, HospitalList } from "../../components";
import { Loading, Text, View } from "../../components/PureComponents";
import Colors from "../../constants/Colors";
import Actions from "../../redux/actions";

export default function Hospital({ navigation }: any) {
  const dispatch = useDispatch();
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const hospitalList =
    useSelector((state: any) => state.homepageReducers.hospitalList) || {};
  const loading = useSelector((state: any) => state.commonReducers.loading);
  const jailStatus = useSelector(
    (state: any) => state.homepageReducers.jailStatus
  );
  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };

  const initRobberyList = async () => {
    await dispatch(Actions.homepageActions.GetRobberyList());
    await dispatch(Actions.homepageActions.GetHospitalList());
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
      <View style={{ flex: 1 }}>{HospitalList(hospitalList, jailStatus)}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGray,
  },
});
