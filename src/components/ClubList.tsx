import { FlatList, Image, StyleSheet } from "react-native";
import _ from "lodash";
import { Text, View, Button } from "./PureComponents";

import Colors from "../constants/Colors";

type ClubItem = {
  value: number;
  label: string;
  img: string;
  ticket_price: number;
  price: number;
};

type ItemType = {
  item: ClubItem;
};
type JailStatusType = {
  block: boolean;
  message: string;
};

export const ClubList = (
  navigation: any,
  clubList: Array<ClubItem>,
  jailStatus: JailStatusType
) => {
  const enterClub = (clubId: number) => {
    navigation.navigate("InClub", { clubId });
  };

  const jailGifs = [
    require("../../assets/lotties/jail.gif"),
    require("../../assets/lotties/jail2.gif"),
  ];
  let randJailIndex = Math.floor(Math.random() * jailGifs.length);

  const ClubItem = ({ item }: ItemType) => {
    return (
      <View
        key={item.value}
        style={{
          backgroundColor: Colors.DarkGray,
          borderRadius: 8,
          flex: 1,
          paddingRight: 15,
          paddingVertical: 15,
          marginVertical: 5,
          marginHorizontal: 15,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 1,
            marginHorizontal: 5,
          }}
        >
          <Image
            style={{ width: "100%", height: "100%" }}
            source={{ uri: item.img }}
          />
        </View>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 3,
          }}
        >
          <Text>İsim: {item.label}</Text>
          <Text>Giriş Ücreti: {item.ticket_price}</Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "center",
            flex: 2,
          }}
        >
          <Button
            style={{ marginBottom: 5 }}
            onPress={() => enterClub(item.value)}
          >
            <Text style={{ textAlign: "center", justifyContent: "center" }}>
              Giriş Yap
            </Text>
          </Button>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.headerContainer}>
      {jailStatus.block ? (
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
      ) : (
        clubList.length > 0 && (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <FlatList
                data={clubList}
                renderItem={({ item }) => (
                  <ClubItem key={item.value} item={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    backgroundColor: Colors.LightGray,
  },
  centeredText: {
    textAlign: "center",
  },
});
