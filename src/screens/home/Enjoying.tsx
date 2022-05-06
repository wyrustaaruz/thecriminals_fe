import { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header, SubHeader, LastHeader } from "../../components";
import { Loading, Text, View } from "../../components/PureComponents";
import Actions from "../../redux/actions";

export default function Enjoying({ navigation }: any) {
  const dispatch = useDispatch();
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const loading = useSelector((state: any) => state.commonReducers.loading);

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
      <Loading status={loading} />
      <View>{Header(characterInfo, navigation)}</View>
      <View>{SubHeader(characterInfo, navigation)}</View>
      <View>{LastHeader(characterInfo)}</View>
      <View style={{ flex: 1 }}>
        <Text>Eğlence Ekranı</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#464646",
  },
});
