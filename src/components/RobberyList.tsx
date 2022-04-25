import { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-community/picker";
import { Text, View, MyModal } from "./PureComponents";
import { ROBBERY_RUN_URL } from "../redux/endpoints";
import { useDispatch } from "react-redux";
import Actions from "../redux/actions";

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
}
export const RobberyList = (robberyList: Array<RobberyItem>) => {
  const dispatch = useDispatch();
  const [selectedRob, setSelectedRob] = useState(0);
  const [hasan, setHasan] = useState(false);
  const [modalChild, setModalChild] = useState(<></>);
  const RobberyItemRender = (item: RobberyItem, index: number) => {
    return <Picker.Item key={index} label={item.name} value={index} />;
  };
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
          const tempModalChild = () => (
            <View>
              <Text style={styles.centeredText}>Başarılı</Text>
              <Text style={styles.centeredText}>{message}</Text>
            </View>
          );
          setModalChild(tempModalChild);
          setHasan(true);
        } else {
          const tempModalChild = () => (
            <View>
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
        console.log("err", error.response.data);
      });
  };
  return (
    <View style={styles.headerContainer}>
      {robberyList.length > 0 ? (
        <Picker
          itemStyle={{ color: "#C0B184" }}
          selectedValue={selectedRob}
          onValueChange={(itemValue, itemIndex) => setSelectedRob(itemIndex)}
        >
          {robberyList.map((item, index) => RobberyItemRender(item, index))}
        </Picker>
      ) : null}
      <View
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>İstenilen Stamina:</Text>
          <Text>{robberyList[selectedRob].required_stamina_percent}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Ödül:</Text>
          <Text>
            ${robberyList[selectedRob].reward_cash_min} - $
            {robberyList[selectedRob].reward_cash_max}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>İhtimal:</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
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
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>Attr:</Text>
          <Text>
            {robberyList[selectedRob].attr_min} -{" "}
            {robberyList[selectedRob].attr_max}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{ borderWidth: 1, padding: 10 }}
        onPress={() => robThis()}
        // onPress={() => setHasan(true)}
      >
        <Text style={{ textAlign: "center", justifyContent: "center" }}>
          Soygun Yap
        </Text>
      </TouchableOpacity>
      <MyModal visible={hasan} onRequestClose={() => setHasan(false)}>
        {modalChild}
      </MyModal>
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
