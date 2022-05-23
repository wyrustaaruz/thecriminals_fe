import { useState } from "react";
import { Alert, Image, StyleSheet } from "react-native";
import axios from "axios";
import _ from "lodash";
import { Text, View, Button, TextInput } from "./PureComponents";
import { TRADER_BUY_URL } from "../redux/endpoints";
import { useDispatch } from "react-redux";
import Actions from "../redux/actions";
import Colors from "../constants/Colors";

type TraderItem = {
  value: number;
  label: string;
  img: string;
  type: string;
  price: number;
  attr: string;
};

type ItemType = {
  item: TraderItem;
};

export const Trader = (characterItemsList: Array<TraderItem>) => {
  const dispatch = useDispatch();
  const [textInputs, setTextInputs] = useState<any>([]);
  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };

  const updateCharacterItems = async () => {
    await dispatch(Actions.homepageActions.GetCharacterItems());
  };

  const loadingTrue = async () => {
    await dispatch(Actions.commonActions.LoadingTrue());
  };

  const loadingFalse = async () => {
    await dispatch(Actions.commonActions.LoadingFalse());
  };

  const buyItem = async (id: number) => {
    loadingTrue();
    axios
      .post(TRADER_BUY_URL + id, {
        count: textInputs[id] ? textInputs[id] : "1",
      })
      .then((res) => {
        Alert.alert(res.data.message);
        initHeader();
        updateCharacterItems();
      })
      .catch((error) => {
        loadingFalse();
        const message = error.response.data.message;
        Alert.alert(message);
      });
  };

  const CharacterItem = ({ item }: ItemType) => {
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
          <Text>Tipi: {item.type}</Text>
          <Text>Fiyat: ${item.price}</Text>
          <Text>{item.attr ? "Etki: " + item.attr : ""}</Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "center",
            flex: 2,
          }}
        >
          <TextInput
            style={{
              marginBottom: 5,
              padding: 10,
              flex: 1,
              width: "70%",
            }}
            keyboardType="number-pad"
            placeholder="1"
            placeholderTextColor={Colors.LightGold}
            returnKeyType="next"
            onChangeText={(text) => {
              textInputs[item.value] = text;
              setTextInputs(textInputs);
            }}
          />
          <Button
            type="button"
            style={{ marginBottom: 5 }}
            onPress={() => buyItem(item.value)}
          >
            <Text
              type="button"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              Satın Al
            </Text>
          </Button>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.headerContainer}>
      {characterItemsList.length > 0 && (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          {characterItemsList.map((item) => (
            <CharacterItem key={item.value} item={item} />
          ))}
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
