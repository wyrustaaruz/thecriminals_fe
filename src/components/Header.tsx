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
      <View>
        <Text style={styles.usernameText}>
          {user.username !== undefined ? user.username : ""}
        </Text>
        <Text>Stamina: {stamina !== undefined ? stamina : "100%"}</Text>
        <Text>
          HP: {health !== undefined ? health + " / " + max_health : "0 / 0"}
        </Text>
        <Text>Bağımlılık: {addiction !== undefined ? addiction : "0"}</Text>
      </View>
      <View>
        <Text style={styles.centeredText}>Intelligence</Text>
        <Text style={styles.centeredText}>
          {intelligence !== undefined ? intelligence : 0}
        </Text>

        <Text style={styles.centeredText}>Strength</Text>
        <Text style={styles.centeredText}>
          {strength !== undefined ? strength : 0}
        </Text>
      </View>
      <View>
        <Text style={styles.centeredText}>Charisma</Text>
        <Text style={styles.centeredText}>
          {charisma !== undefined ? charisma : 0}
        </Text>

        <Text style={styles.centeredText}>Tolerance</Text>
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
    shadowColor: Colors.Gold,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  menuContainer: {
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
  },
  centeredText: {
    textAlign: "center",
  },
  centeredView: {
    justifyContent: "center",
    alignContent: "flex-end",
  },
});
