import { StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import { Text, View } from "./PureComponents";

type UserType = {
  username: string;
};
export const Header = (
  characterInfo: {
    avatar: string;
    user: UserType;
    health: number;
    max_health: number;
    stamina: number;
    intelligence: number;
    strength: number;
    charisma: number;
    tolerance: number;
    addiction: number;
  },
  navigation: any
) => {
  const {
    avatar,
    user,
    health,
    max_health,
    stamina,
    intelligence,
    strength,
    charisma,
    tolerance,
    addiction,
  } = characterInfo || {};

  return (
    <View style={styles.headerContainer}>
      <View style={styles.logoContainer}>
        {avatar ? (
          <Image
            style={styles.tinyLogo}
            source={{
              uri: avatar,
            }}
          />
        ) : (
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/images/avatar_20.png")}
          />
        )}
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text numberOfLines={1} style={styles.usernameText}>
          {user.username !== undefined ? user.username : ""}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.whiteColor}>Dayanıklılık:</Text>
          <Text>{stamina !== undefined ? stamina : "100%"}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.whiteColor}>Can:</Text>
          <Text>
            {health !== undefined ? health + " / " + max_health : "0 / 0"}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.whiteColor}>Bağımlılık:</Text>
          <Text>{addiction !== undefined ? addiction : "0"}</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.centeredText, styles.whiteColor]}>Zeka</Text>
        <Text style={styles.centeredText}>
          {intelligence !== undefined ? intelligence : 0}
        </Text>

        <Text style={[styles.centeredText, styles.whiteColor]}>Güç</Text>
        <Text style={styles.centeredText}>
          {strength !== undefined ? strength : 0}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.centeredText, styles.whiteColor]}>Karizma</Text>
        <Text style={styles.centeredText}>
          {charisma !== undefined ? charisma : 0}
        </Text>

        <Text style={[styles.centeredText, styles.whiteColor]}>Tölerans</Text>
        <Text style={styles.centeredText}>
          {tolerance !== undefined ? tolerance : 0}
        </Text>
      </View>
      <View style={[styles.centeredView, styles.menuContainer]}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Image
            style={styles.menuLogo}
            source={require("../../assets/images/menu_icon_gold.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.LightGray,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tinyLogo: {
    paddingLeft: 5,
    marginLeft: 10,
    borderRadius: 8,
    width: 70,
    height: 70,
  },
  logoContainer: {
    flex: 1,
    shadowColor: Colors.Gold,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  menuContainer: {
    flex: 1,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLogo: {
    width: 20,
    height: 20,
  },
  usernameText: {
    fontSize: 20,
    fontWeight: "600",
  },
  whiteColor: {
    color: Colors.White,
  },
  centeredText: {
    textAlign: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignContent: "flex-end",
  },
});
