import { StyleSheet } from "react-native";
import { Text, View } from "../../components/PureComponents";
import { RootStackScreenProps } from "../../../types";
import Colors from "../../constants/Colors";

export default function Splash({}: RootStackScreenProps<"Splash">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yükleniyor...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGray,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
