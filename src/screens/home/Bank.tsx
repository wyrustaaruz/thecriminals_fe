import { StyleSheet, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { Header, SubHeader, LastHeader, BankComponent } from "../../components";
import { Loading, View } from "../../components/PureComponents";
import Colors from "../../constants/Colors";

export default function Bank({ navigation }: any) {
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const loading = useSelector((state: any) => state.commonReducers.loading);

  return (
    <SafeAreaView style={styles.container}>
      <Loading status={loading} />
      <View>{Header(characterInfo, navigation)}</View>
      <View>{SubHeader(characterInfo, navigation)}</View>
      <View>{LastHeader(characterInfo)}</View>
      <View>{BankComponent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGray,
  },
});
