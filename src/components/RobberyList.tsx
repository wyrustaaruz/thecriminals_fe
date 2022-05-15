import { useState } from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";
import _ from "lodash";
import { Text, View, MyModal, Button } from "./PureComponents";
import { ROBBERY_RUN_URL } from "../redux/endpoints";
import { useDispatch } from "react-redux";
import Actions from "../redux/actions";
import LottieView from "lottie-react-native";
import Colors from "../constants/Colors";

interface RobberyItem {
  label?: string;
  value: number;
  power?: number;
  required_stamina_percent?: number;
  daily?: number;
  reward_cash_min?: number;
  reward_cash_max?: number;
  attr_min?: number;
  attr_max?: number;
  percent?: number;
  reward_item?: any;
}
type RobItemType = {
  item: RobberyItem;
};
export const RobberyList = (robberyList: Array<RobberyItem>) => {
  const dispatch = useDispatch();
  const [modalShown, setModalShown] = useState(false);
  const [modalChild, setModalChild] = useState(<></>);

  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };

  const initRobberyList = async () => {
    await dispatch(Actions.homepageActions.GetRobberyList());
  };

  const loadingTrue = async () => {
    await dispatch(Actions.commonActions.LoadingTrue());
  };
  const loadingFalse = async () => {
    await dispatch(Actions.commonActions.LoadingFalse());
  };
  const robThis = (value: number) => {
    loadingTrue();
    axios
      .get(ROBBERY_RUN_URL + value)
      .then((res) => {
        if (res.data.status === "success") {
          const message =
            res.data.message +
            "\nKazanılan Ödül:\n" +
            "Cash: $" +
            res.data.rewards.cash +
            "\nItem: " +
            JSON.stringify(res.data.rewards.item)
              .replaceAll("{", "")
              .replaceAll("}", "")
              .replaceAll("[", "")
              .replaceAll("]", "");
          const lottieImages = [
            require("../../assets/lotties/man-in-brown.json"),
            require("../../assets/lotties/man-in-green.json"),
            require("../../assets/lotties/mustache.json"),
            require("../../assets/lotties/woman.json"),
          ];
          let randIndex = Math.floor(Math.random() * lottieImages.length);
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
                source={lottieImages[randIndex]}
              />
              <Text style={styles.centeredText}>Başarılı</Text>
              <Text style={styles.centeredText}>{message}</Text>
            </View>
          );
          setModalChild(tempModalChild);
          setModalShown(true);
        } else {
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
              <Text style={styles.centeredText}>{res.data.message}</Text>
            </View>
          );
          setModalChild(tempModalChild);
          setModalShown(true);
        }
        initHeader();
        initRobberyList();
      })
      .catch((error) => {
        loadingFalse();
      });
  };

  const RobItem = ({ item }: RobItemType) => {
    const dynamicColor =
      item.percent && item.percent >= 80
        ? Colors.Green
        : item.percent && item.percent < 80 && item.percent >= 40
        ? Colors.Orange
        : Colors.Red;
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
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <Image
            style={{ width: 50, height: 50, borderRadius: 10 }}
            source={require("../../assets/images/avatar_20.png")}
          />
        </View>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 3,
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>
            {item.label}
          </Text>
          <Text>Dayanıklılık: {item.required_stamina_percent}</Text>
          {!_.isEmpty(item.reward_item) && (
            <Text>
              {item.reward_item
                ? Object.keys(item.reward_item) +
                  ": " +
                  Object.values(item.reward_item)
                : "-"}
            </Text>
          )}
        </View>
        <View
          style={{ alignItems: "flex-end", justifyContent: "center", flex: 2 }}
        >
          <Button
            style={{ marginBottom: 5 }}
            onPress={() => robThis(item.value)}
          >
            <Text
              type="button"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              Soygun Yap
            </Text>
          </Button>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "600",
                  color: dynamicColor,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                %{item.percent}
              </Text>
              <View
                style={{
                  marginLeft: 5,
                  width: 20,
                  height: 20,
                  backgroundColor: dynamicColor,
                  borderRadius: 10,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.headerContainer}>
      {robberyList.length > 0 && (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <FlatList
              data={robberyList}
              renderItem={({ item }) => (
                <RobItem key={item.value} item={item} />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          <MyModal
            visible={modalShown}
            onRequestClose={() => setModalShown(false)}
          >
            {modalChild}
          </MyModal>
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
