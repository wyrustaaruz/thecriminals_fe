import { useState } from "react";
import { Alert, Image, StyleSheet } from "react-native";
import axios from "axios";
import _ from "lodash";
import { Text, View, MyModal, Button, TextInput } from "./PureComponents";
import { TRADER_SELL_URL, INVENTORY_USE_URL } from "../redux/endpoints";
import { useDispatch } from "react-redux";
import Actions from "../redux/actions";
import Colors from "../constants/Colors";

type InventoryItem = {
  value: string;
  label: string;
  count: string;
  type: string;
  attr: string;
  img: string;
};

type ItemType = {
  item: InventoryItem;
};

export const Inventory = (characterItemsList: Array<InventoryItem>) => {
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [textInputs, setTextInputs] = useState<any>([]);
  const [modalChild, setModalChild] = useState(<></>);
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

  const ConfirmationModal = (item: InventoryItem) => {
    return (
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Text style={styles.centeredText}>
            {item.label} isimli eşyadan{" "}
            {textInputs[item.value] ? textInputs[item.value] : "1"} ad. satmak
            istediğine emin misin?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 20,
            }}
          >
            <Button
              type="danger"
              style={{ marginHorizontal: 15 }}
              onPress={() => sellItem(item.value)}
            >
              <Text type="danger">Evet</Text>
            </Button>
            <Button
              style={{ marginHorizontal: 15 }}
              onPress={() => setShowConfirmationModal(false)}
            >
              <Text type="button">Hayır</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  };
  const sellItem = async (id: string) => {
    loadingTrue();
    setShowConfirmationModal(false);
    axios
      .post(TRADER_SELL_URL + id, {
        count: textInputs[id] ? textInputs[id] : "1",
      })
      .then((res) => {
        loadingFalse();
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
  const useItem = async (id: string) => {
    loadingTrue();
    setShowConfirmationModal(false);
    axios
      .get(INVENTORY_USE_URL + id)
      .then((res) => {
        loadingFalse();
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
          <Text>Adet: {item.count}</Text>
          <Text>{item.attr ? "Etki: " + item.attr : ""}</Text>
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
            onPress={() => {
              useItem(item.value);
            }}
          >
            <Text
              type="button"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              Kullan
            </Text>
          </Button>
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
            type="danger"
            style={{ marginBottom: 5 }}
            onPress={() => {
              setShowConfirmationModal(true);
              setModalChild(ConfirmationModal(item));
            }}
          >
            <Text
              type="danger"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              Sat
            </Text>
          </Button>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.headerContainer}>
      {characterItemsList.length > 0 && (
        <View>
          {characterItemsList.map((item) => (
            <CharacterItem key={item.value} item={item} />
          ))}
        </View>
      )}
      <MyModal
        visible={showConfirmationModal}
        onRequestClose={() => setShowConfirmationModal(false)}
      >
        {modalChild}
      </MyModal>
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
