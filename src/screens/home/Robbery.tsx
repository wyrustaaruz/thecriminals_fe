import { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header, SubHeader, LastHeader } from "../../components";
import { View } from "../../components/PureComponents";
import Actions from "../../redux/actions";

export default function Robbery() {
  const dispatch = useDispatch();
  const characterInfo =
    useSelector((state: any) => state.homepageReducers) || {};

  const init = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>{Header(characterInfo)}</View>
      <View>{SubHeader(characterInfo)}</View>
      <View>{LastHeader(characterInfo)}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#464646",
  },
});
