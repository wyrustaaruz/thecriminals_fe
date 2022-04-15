import { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Header, SubHeader } from "../components";
import { View } from "../components/PureComponents";
import {
  HeaderPropsType,
  SubHeaderPropsType,
} from "../components/types/RobTypes";

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
  const [subHeaderInfo, setSubHeaderInfo] = useState<SubHeaderPropsType>({
    money: "",
    credit: "",
  });
  return (
    <SafeAreaView style={styles.container}>
      <View>{Header(characterInfo)}</View>
      <View>{SubHeader(subHeaderInfo)}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#464646",
  },
});
