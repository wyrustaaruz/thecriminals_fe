import { StyleSheet, Image } from "react-native";
import { Text, View } from "./PureComponents";

export const LastHeader = (characterInfo: {
  spirit: number;
  respect: number;
  weapon: number;
  armor: number;
  guard: number;
}) => {
  const { spirit, respect, weapon, armor, guard } = characterInfo || {};

  return (
    <View style={styles.headerContainer}>
      <View style={styles.alignSelfCenter}>
        <Text style={styles.alignSelfCenter}>Spirit</Text>
        <Text style={styles.alignSelfCenter}>
          {spirit !== undefined ? spirit : "0$"}
        </Text>
      </View>
      <View style={styles.alignSelfCenter}>
        <Text style={styles.alignSelfCenter}>Respect</Text>
        <Text style={styles.alignSelfCenter}>
          {respect !== undefined ? respect : "0"}
        </Text>
      </View>
      <View style={styles.alignSelfCenter}>
        <Text style={styles.alignSelfCenter}>Weapon</Text>
        <Text style={styles.alignSelfCenter}>
          {weapon !== undefined ? weapon : "0"}
        </Text>
      </View>
      <View style={styles.alignSelfCenter}>
        <Text style={styles.alignSelfCenter}>Armor</Text>
        <Text style={styles.alignSelfCenter}>
          {armor !== undefined ? armor : "0"}
        </Text>
      </View>
      <View style={styles.alignSelfCenter}>
        <Text style={styles.alignSelfCenter}>Guard</Text>
        <Text style={styles.alignSelfCenter}>
          {guard !== undefined ? guard : "0"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 5,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly",
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