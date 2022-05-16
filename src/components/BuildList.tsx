import { useState } from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";
import _ from "lodash";
import { Text, View, MyModal, Button } from "./PureComponents";
import {
  BUILDING_BUY_URL,
  BUILDING_COLLECT_URL,
  BUILDING_SELL_URL,
} from "../redux/endpoints";
import { useDispatch } from "react-redux";
import Actions from "../redux/actions";
import LottieView from "lottie-react-native";
import Colors from "../constants/Colors";

type BuildItem = {
  value: number;
  label: string;
  img: string;
  production: number;
  daily_earning: number;
  price: number;
  total_earning?: number;
  item: string;
  item_name: string;
  count: number;
};

type ItemType = {
  item: BuildItem;
};

export const BuildList = (buildList: Array<BuildItem>, buyable: boolean) => {
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [modalChild, setModalChild] = useState(<></>);

  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };

  const initBuildings = async () => {
    await dispatch(Actions.homepageActions.GetBuildList());
  };

  const initOwnBuildings = async () => {
    await dispatch(Actions.homepageActions.GetOwnBuildList());
  };

  const loadingTrue = async () => {
    await dispatch(Actions.commonActions.LoadingTrue());
  };

  const loadingFalse = async () => {
    await dispatch(Actions.commonActions.LoadingFalse());
  };

  const collectMoney = async (value: number) => {
    loadingTrue();
    axios
      .get(BUILDING_COLLECT_URL + value)
      .then((res) => {
        const tempModalChild = () => (
          <View>
            <Text style={styles.centeredText}>{res.data.message}</Text>
          </View>
        );
        setModalChild(tempModalChild);
        setModalShown(true);
        initHeader();
        initBuildings();
        initOwnBuildings();
      })
      .catch((error) => {
        loadingFalse();
        const message = error.response.data.message;
        const tempModalChild = () => (
          <View>
            <LottieView
              style={{
                width: "50%",
                alignSelf: "center",
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
  const ConfirmationModal = (item: BuildItem) => {
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
          <Text>{item.label} isimli binayı satmak istediğine emin misin?</Text>
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
  const sellItem = async (value: number) => {
    loadingTrue();
    setShowConfirmationModal(false);
    axios
      .get(BUILDING_SELL_URL + value)
      .then((res) => {
        const tempModalChild = () => (
          <View>
            <Text style={styles.centeredText}>{res.data.message}</Text>
          </View>
        );
        setModalChild(tempModalChild);
        setModalShown(true);
        initHeader();
        initBuildings();
        initOwnBuildings();
      })
      .catch((error) => {
        loadingFalse();
        const message = error.response.data.message;
        const tempModalChild = () => (
          <View>
            <LottieView
              style={{
                width: "50%",
                alignSelf: "center",
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
  const buyItem = async (value: number) => {
    loadingTrue();
    axios
      .get(BUILDING_BUY_URL + value)
      .then((res) => {
        const tempModalChild = () => (
          <View>
            <Text style={styles.centeredText}>{res.data.message}</Text>
          </View>
        );
        setModalChild(tempModalChild);
        setModalShown(true);
        initHeader();
        initBuildings();
        initOwnBuildings();
      })
      .catch((error) => {
        loadingFalse();
        const message = error.response.data.message;
        const tempModalChild = () => (
          <View>
            <LottieView
              style={{
                width: "50%",
                alignSelf: "center",
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

  const BuildingItem = ({ item }: ItemType) => {
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
          <Image style={{ width: 50, height: 50 }} source={{ uri: item.img }} />
        </View>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 3,
          }}
        >
          <Text style={{ fontWeight: "600", color: Colors.White }}>
            {item.label}
          </Text>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ color: Colors.White }}>Ürün: </Text>
            {!buyable ? (
              <Text>{`${item.item_name} (${item.production} ad.)`}</Text>
            ) : (
              <Text>{`${item.item} (${item.production} ad.)`}</Text>
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: Colors.White }}>Kazanç: </Text>
            <Text>${item.daily_earning}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: Colors.White }}>Ücret: </Text>
            <Text>${item.price}</Text>
          </View>

          {!buyable && (
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: Colors.White }}>
                Sahip Olduğun Miktar:{" "}
              </Text>
              <Text>{item.count} ad.</Text>
            </View>
          )}
          {!buyable && (
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: Colors.White }}>Toplam Kazanç: </Text>
              <Text>${item.total_earning}</Text>
            </View>
          )}
        </View>
        {buyable ? (
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "center",
              flex: 2,
            }}
          >
            <Button
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
        ) : (
          <View
            style={{
              alignItems: "flex-end",
              justifyContent: "center",
              flex: 2,
            }}
          >
            <Button
              style={{ marginBottom: 5 }}
              onPress={() => collectMoney(item.value)}
            >
              <Text
                type="button"
                style={{ textAlign: "center", justifyContent: "center" }}
              >
                Geliri Topla
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
                Sat
              </Text>
            </Button>
          </View>
        )}
      </View>
    );
  };
  return (
    <View style={styles.headerContainer}>
      {buildList.length > 0 && (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <FlatList
              data={buildList}
              renderItem={({ item }) => (
                <BuildingItem key={item.value} item={item} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
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
