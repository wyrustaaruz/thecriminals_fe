import { useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import { Text, View } from "./PureComponents";
import { useDispatch, useSelector } from "react-redux";
import { getHeaderRequest } from "../store/homepage/action";

export const Header = () => {
  const dispatch = useDispatch();
  const characterInfo = useSelector((state: any) => state.drinks) || {};
  console.log("characterInfo", characterInfo);
  const { logo, name, hp, stamina, int, str, char, tol } = characterInfo || {};
  useEffect(() => {
    dispatch(getHeaderRequest());
  }, []);
  return (
    <View style={styles.headerContainer}>
      <View>
        {logo ? (
          <Image
            style={styles.tinyLogo}
            source={{
              uri: logo,
            }}
          />
        ) : (
          <Image
            style={styles.tinyLogo}
            source={require("../assets/images/avatar_20.png")}
          />
        )}
      </View>
      <View>
        <Text style={styles.nameText}>{name ? name : "Hasan"}</Text>
        <Text>Stamina: {stamina ? stamina : "100%"}</Text>
        <Text>HP: {hp ? hp : "51 / 51"}</Text>
      </View>
      <View>
        <Text style={styles.centeredText}>Intelligence</Text>
        <Text style={styles.centeredText}>{int ? int : 0}</Text>

        <Text style={styles.centeredText}>Strength</Text>
        <Text style={styles.centeredText}>{str ? str : 0}</Text>
      </View>
      <View>
        <Text style={styles.centeredText}>Charisma</Text>
        <Text style={styles.centeredText}>{char ? char : 0}</Text>

        <Text style={styles.centeredText}>Tolerance</Text>
        <Text style={styles.centeredText}>{tol ? tol : 0}</Text>
      </View>
      <View style={styles.centeredView}>
        <Image
          style={styles.menuLogo}
          source={require("../assets/images/32px-Hamburger_icon.png")}
        />
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
