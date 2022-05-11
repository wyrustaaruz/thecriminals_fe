import { useState } from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";
import _ from "lodash";
import { Text, View, MyModal, Button } from "./PureComponents";
import { CLUB_SELL_URL } from "../redux/endpoints";
import { useDispatch } from "react-redux";
import Actions from "../redux/actions";
import LottieView from "lottie-react-native";
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
type JailStatusType = {
  block: boolean;
  message: string;
};

export const Inventory = (
  characterItemsList: Array<InventoryItem>,
  jailStatus: JailStatusType
) => {
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [modalChild, setModalChild] = useState(<></>);
  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
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
          <Text>
            {item.label} isimli gece kulübünü satmak istediğine emin misin?
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
              <Text>Hayır</Text>
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
      .get(CLUB_SELL_URL + id)
      .then((res) => {
        const tempModalChild = () => (
          <View>
            <Text style={styles.centeredText}>{res.data.message}</Text>
          </View>
        );
        setModalChild(tempModalChild);
        setModalShown(true);
        initHeader();
      })
      .catch((error) => {
        loadingFalse();
        const message = error.response.data.message;
        const tempModalChild = () => (
          <View>
            <LottieView
              style={{
                width: 400,
                height: 400,
                backgroundColor: "transparent",
              }}
              autoPlay={true}
              loop={false}
              source={require("../../assets/lotties/boss.json")}
            />
            <Text style={styles.centeredText}>Opss.</Text>
            <Text style={styles.centeredText}>{message}</Text>
          </View>
        );
        setModalChild(tempModalChild);
        setModalShown(true);
      });
  };

  const jailGifs = [
    require("../../assets/lotties/jail.gif"),
    require("../../assets/lotties/jail2.gif"),
  ];
  let randJailIndex = Math.floor(Math.random() * jailGifs.length);

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
          <Text>Etki: {item.attr}</Text>
        </View>
        {/* <View
          style={{
            alignItems: "flex-end",
            justifyContent: "center",
            flex: 2,
          }}
        >
          <Button
            style={{ marginBottom: 5 }}
            onPress={() => console.log(item.value)}
          >
            <Text style={{ textAlign: "center", justifyContent: "center" }}>
              Tak
            </Text>
          </Button>
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
              Çıkart
            </Text>
          </Button>
        </View> */}
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
        characterItemsList.length > 0 && (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <FlatList
              data={characterItemsList}
              renderItem={({ item }) => (
                <CharacterItem key={item.value} item={item} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )
      )}
      <MyModal visible={modalShown} onRequestClose={() => setModalShown(false)}>
        {modalChild}
      </MyModal>
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
