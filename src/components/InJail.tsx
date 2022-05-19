import { useState, useCallback } from "react";
import { ScrollView, RefreshControl, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import { Text, View } from "./PureComponents";

export const InJail = ({ myCallbackList }: any) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    myCallbackList();
    setRefreshing(false);
  }, []);

  const jailGifs = [
    require("../../assets/lotties/jail.gif"),
    require("../../assets/lotties/jail2.gif"),
  ];
  const randJailIndex = Math.floor(Math.random() * jailGifs.length);
  const jailStatus = useSelector(
    (state: any) => state.homepageReducers.jailStatus
  );
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: Colors.LightGray,
          padding: 20,
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: "100%", height: "40%" }}
          source={jailGifs[randJailIndex]}
        />
        <Text style={{ marginTop: 20, textAlign: "center" }}>
          {jailStatus.message}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly",
    backgroundColor: Colors.DarkGray,
  },
  tinyLogo: {
    width: 35,
    height: 35,
  },
  coinImage: {
    marginHorizontal: 5,
    width: 15,
    height: 15,
  },
  flexDirectionRow: {
    flexDirection: "row",
  },
  marginHorizontal10: {
    marginHorizontal: 10,
  },
  alignSelfCenter: {
    alignSelf: "center",
  },
  whiteColor: {
    color: Colors.White,
  },
});
