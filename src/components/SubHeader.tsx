import { StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Text, View } from "./PureComponents";

type UserType = {
  credits: number;
};
export const SubHeader = (
  characterInfo: { cash: number; user: UserType },
  navigation: any
) => {
  const { cash, user } = characterInfo || {};
  const { credits } = user || 0;
  return (
    <View style={styles.headerContainer}>
      <View style={styles.flexDirectionRow}>
        <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
          <Image
            style={[styles.tinyLogo, styles.marginHorizontal10]}
            source={require("../../assets/images/icon_msgcenter_bw.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Friendship")}>
          <Image
            style={[styles.tinyLogo, styles.marginHorizontal10]}
            source={require("../../assets/images/icon_friends_bw_old.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Clan")}>
          <Image
            style={[styles.tinyLogo, styles.marginHorizontal10]}
            source={require("../../assets/images/icon_gangcenter_bw.png")}
          />
        </TouchableOpacity>
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
    backgroundColor: Colors.DarkGray,
  },
  tinyLogo: {
    width: 35,
    height: 35,
    borderRadius: 8,
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
