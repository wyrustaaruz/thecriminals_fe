import { StyleSheet, SafeAreaView } from "react-native";
import { Header, SubHeader } from "../components";
import { View } from "../components/PureComponents";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View>{Header()}</View>
      <View>{SubHeader()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#464646",
  },
});
