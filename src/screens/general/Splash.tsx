import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/PureComponents";
import { RootStackScreenProps } from "../../../types";

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
    backgroundColor: "#464646",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
