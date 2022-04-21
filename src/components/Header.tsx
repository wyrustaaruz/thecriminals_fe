import { useEffect } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text, View } from "./PureComponents";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../redux/actions";

export const Header = (characterInfo: {
  avatar: string;
  name: number;
  health: number;
  max_health: number;
  stamina: number;
  intelligence: number;
  strength: number;
  charisma: number;
  tolerance: number;
  addiction: number;
}) => {
  const dispatch = useDispatch();
  const {
    avatar,
    name,
    health,
    max_health,
    stamina,
    intelligence,
    strength,
    charisma,
    tolerance,
    addiction,
  } = characterInfo || {};
  const handleLogOut = async () => {
    try {
      dispatch(Actions.authActions.Logout());
    } catch (e) {
      console.log("dispatchErr_Header", e);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View>
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
        <Text style={styles.nameText}>
          {name !== undefined ? name : "Hasan"}
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
      <View style={styles.centeredView}>
        <TouchableOpacity
          onPress={() => {
            handleLogOut();
          }}
        >
          <Image
            style={styles.menuLogo}
            source={require("../../assets/images/32px-Hamburger_icon.png")}
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
    backgroundColor: "#464646",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tinyLogo: {
    width: 70,
    height: 70,
  },
  menuLogo: {
    width: 50,
    height: 50,
  },
  nameText: {
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
