import { StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { Header, SubHeader } from "../components";
import { Text, View } from "../components/PureComponents";
import { useDispatch, useSelector } from "react-redux";
import { getHeaderRequest } from "../store/homepage/action";
import { useEffect } from "react";

export default function TabOneScreen() {
  const characterInfo = {
    logo: "",
    name: "",
    hp: "",
    stamina: "",
    int: "",
    str: "",
    char: "",
    tol: "",
  };
  const subHeaderInfo = {
    money: "",
    credit: "",
  };
  const dispatch = useDispatch();

  const drinks = useSelector((state: any) => state.drinks);
  console.log("drinks", drinks);
  useEffect(() => {
    dispatch(getHeaderRequest());
  }, []);
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
