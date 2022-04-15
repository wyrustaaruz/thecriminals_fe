import { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Header, SubHeader } from "../components";
import { View } from "../components/PureComponents";
import { HeaderPropsType } from "./types/RobTypes";

export default function TabOneScreen() {
  const [characterInfo, setCharacterInfo] = useState<HeaderPropsType>({
    logo: "",
    name: "",
    hp: "",
    stamina: "",
    int: "",
    str: "",
    char: "",
    tol: "",
  });
  return (
    <SafeAreaView style={styles.container}>
      <View>{Header(characterInfo)}</View>
      <View>{SubHeader(characterInfo)}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#464646",
  },
});
