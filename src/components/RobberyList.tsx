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
type JailStatusType = {
  block: boolean;
  message: string;
};
export const RobberyList = (
  robberyList: Array<RobberyItem>,
  jailStatus: JailStatusType
) => {
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

  const jailGifs = [
    require("../../assets/lotties/jail.gif"),
    require("../../assets/lotties/jail2.gif"),
  ];
  let randJailIndex = Math.floor(Math.random() * jailGifs.length);
  const RobItem = ({ item }: RobItemType) => (
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
          style={{ width: 50, height: 50 }}
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
        <Text>{item.label}</Text>
        <Text>Dayanıklılık: {item.required_stamina_percent}</Text>
        <Text>
          Ödül: ${item.reward_cash_min} - ${item.reward_cash_max}
        </Text>
        <Text>
          Kazanılacak Puan: {item.attr_min} - {item.attr_max}
        </Text>
        <Text>
          Kazanılacak Nesne:{" "}
          {item.reward_item
            ? Object.keys(item.reward_item) +
              ": " +
              Object.values(item.reward_item)
            : "-"}
        </Text>
      </View>
      <View
        style={{ alignItems: "flex-end", justifyContent: "center", flex: 2 }}
      >
        <Button style={{ marginBottom: 5 }} onPress={() => robThis(item.value)}>
          <Text
            type="button"
            style={{ textAlign: "center", justifyContent: "center" }}
          >
            Soygun Yap
          </Text>
        </Button>
        <Text>İhtimal:</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text>{item.percent}</Text>
          <View
            style={{
              marginLeft: 5,
              width: 20,
              height: 20,
              backgroundColor:
                item.percent && item.percent >= 80
                  ? "green"
                  : item.percent && item.percent < 80 && item.percent >= 40
                  ? "orange"
                  : "red",
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    </View>
  );

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
        robberyList.length > 0 && (
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
