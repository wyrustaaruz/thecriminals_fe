import { FlatList, StyleSheet } from "react-native";
import _ from "lodash";
import { Text, View, Button } from "./PureComponents";

import Colors from "../constants/Colors";

type ClubItem = {
  id: number;
  label: string;
  img: string;
  ticket_price: number;
};

type ItemType = {
  item: ClubItem;
};

export const ClubList = (navigation: any, clubList: Array<ClubItem>) => {
  const enterClub = (clubId: number) => {
    navigation.navigate("InClub", { clubId });
  };

  const ClubItem = ({ item }: ItemType) => {
    return (
      <View
        key={item.id}
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
          <View>
            <Text style={{ color: Colors.White }}>Giriş Ücreti: </Text>
            <Text>${item.ticket_price}</Text>
          </View>
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
            onPress={() => enterClub(item.id)}
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
      {clubList.length > 0 && (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <FlatList
              numColumns={2}
              data={clubList}
              renderItem={({ item }) => <ClubItem key={item.id} item={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
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
