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
          width: "50%",
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
            flex: 3,
            paddingLeft: 10,
          }}
        >
          <Text style={{ fontWeight: "600", color: Colors.White }}>
            {item.label}
          </Text>
          <Text>Giriş Ücreti: ${item.ticket_price}</Text>
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
            <Text
              type="button"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              Gir
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
            <View style={{}}>
              <FlatList
                numColumns={2}
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
