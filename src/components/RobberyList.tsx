import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { Text, View, MyModal, Picker } from "./PureComponents";
import { ROBBERY_RUN_URL } from "../redux/endpoints";
import { useDispatch } from "react-redux";
import Actions from "../redux/actions";
import LottieView from "lottie-react-native";

interface RobberyItem {
  name: string;
  power: number;
  required_stamina_percent: number;
  daily: number;
  reward_cash_min: number;
  reward_cash_max: number;
  attr_min: number;
  attr_max: number;
  percent: number;
  reward_item: any;
}
type JailStatusType = {
  block: boolean;
  message: string;
};
export const RobberyList = (
  robberyList: Array<RobberyItem>,
  jailStatus: JailStatusType
) => {
  const dispatch = useDispatch();
  const [selectedRob, setSelectedRob] = useState(0);
  const [hasan, setHasan] = useState(false);
  const [modalChild, setModalChild] = useState(<></>);
  const [open, setOpen] = useState(false);

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
  const robThis = () => {
    loadingTrue();
    axios
      .get(ROBBERY_RUN_URL + selectedRob)
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
          setHasan(true);
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
          setHasan(true);
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

  return (
    <View style={styles.headerContainer}>
      {jailStatus.block ? (
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "#464646",
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
        <>
          <Picker
            containerStyle={{ width: "100%" }}
            open={open}
            value={selectedRob}
            items={robberyList}
            setOpen={setOpen}
            setValue={setSelectedRob}
          />
          <View
            style={{
              paddingVertical: 20,
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>İstenilen Stamina:</Text>
              <Text>{robberyList[selectedRob].required_stamina_percent}</Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Ödül:</Text>
              <Text>
                ${robberyList[selectedRob].reward_cash_min} - $
                {robberyList[selectedRob].reward_cash_max}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>İhtimal:</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{robberyList[selectedRob].percent}</Text>
                <View
                  style={{
                    marginLeft: 5,
                    width: 20,
                    height: 20,
                    backgroundColor:
                      robberyList[selectedRob].percent >= 80
                        ? "green"
                        : robberyList[selectedRob].percent < 80 &&
                          robberyList[selectedRob].percent >= 40
                        ? "orange"
                        : "red",
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Kazanacağın Stat:</Text>
              <Text>
                {robberyList[selectedRob].attr_min} -{" "}
                {robberyList[selectedRob].attr_max}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text>Kazanacağın Item:</Text>
              <Text>
                {robberyList[selectedRob].reward_item
                  ? Object.keys(robberyList[selectedRob].reward_item) +
                    ": " +
                    Object.values(robberyList[selectedRob].reward_item)
                  : "-"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 8,
              borderColor: "#C0B184",
            }}
            onPress={() => robThis()}
          >
            <Text style={{ textAlign: "center", justifyContent: "center" }}>
              Soygun Yap
            </Text>
          </TouchableOpacity>
          <MyModal visible={hasan} onRequestClose={() => setHasan(false)}>
            {modalChild}
          </MyModal>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#464646",
    padding: 20,
  },
  centeredText: {
    textAlign: "center",
  },
});
