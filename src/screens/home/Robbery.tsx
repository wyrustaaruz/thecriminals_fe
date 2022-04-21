import { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header, SubHeader, LastHeader, RobberyList } from "../../components";
import { View } from "../../components/PureComponents";
import Actions from "../../redux/actions";

export default function Robbery() {
  const dispatch = useDispatch();
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const robberyList =
    useSelector((state: any) => state.homepageReducers.robberyList) || {};

  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };

  const initRobberyList = async () => {
    await dispatch(Actions.homepageActions.GetRobberyList());
  };

  useEffect(() => {
    initHeader();
    initRobberyList();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>{Header(characterInfo)}</View>
      <View>{SubHeader(characterInfo)}</View>
      <View>{LastHeader(characterInfo)}</View>
      <View>{RobberyList(robberyList)}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#464646",
  },
});
