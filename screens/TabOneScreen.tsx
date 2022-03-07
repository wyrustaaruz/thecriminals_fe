import { useState } from "react";
import { StyleSheet, SafeAreaView, Image } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { HeaderPropsType } from "./types/RubTypes";

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
  const Header = (headerProps: HeaderPropsType) => {
    const { logo, name, hp, stamina, int, str, char, tol } = headerProps || {};
    return (
      <View style={styles.headerContainer}>
        <Image
          style={styles.tinyLogo}
          source={{
            uri: logo ? logo : "https://reactnative.dev/img/tiny_logo.png",
          }}
        />
        <View>
          <Text>{name ? name : "Hasan"}</Text>
          <Text>Stamina: {stamina ? stamina : "0"}</Text>
          <Text>HP: {hp ? hp : "%0"}</Text>
        </View>
        <View>
          <Text>Intelligence</Text>
          <Text>{int ? int : 0}</Text>

          <Text>Strength</Text>
          <Text>{str ? str : 0}</Text>
        </View>
        <View>
          <Text>Charisma</Text>
          <Text>{char ? char : 0}</Text>

          <Text>Tolerance</Text>
          <Text>{tol ? tol : 0}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {Header(characterInfo)}
      <Text style={styles.title}>Tab One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  headerContainer: {
    flexDirection: "row",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
});
