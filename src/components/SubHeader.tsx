import { StyleSheet, Image } from "react-native";
import { Text, View } from "./PureComponents";

export const SubHeader = (characterInfo: { cash: number; credits: number }) => {
  const { cash, credits } = characterInfo || {};

  return (
    <View style={styles.headerContainer}>
      <View style={[styles.flexDirectionRow]}>
        <Image
          style={[styles.tinyLogo, styles.marginHorizontal10]}
          source={require("../../assets/images/icon_msgcenter_bw.png")}
        />
        <Image
          style={[styles.tinyLogo, styles.marginHorizontal10]}
          source={require("../../assets/images/icon_friends_bw_old.png")}
        />
        <Image
          style={[styles.tinyLogo, styles.marginHorizontal10]}
          source={require("../../assets/images/icon_gangcenter_bw.png")}
        />
      </View>
      <View style={styles.alignSelfCenter}>
        <Text>{cash !== undefined ? "$" + cash : "$0"}</Text>
      </View>
      <View style={[styles.flexDirectionRow, styles.alignSelfCenter]}>
        <Text>{credits !== undefined ? credits : "0"}</Text>
        <Image
          style={styles.coinImage}
          source={require("../../assets/images/credits.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    backgroundColor: "#333333",
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
});
