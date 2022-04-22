import { Alert, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./PureComponents";
import { Picker } from "@react-native-community/picker";
import { useState } from "react";
import axios from "axios";
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
  const RobberyItemRender = (item: RobberyItem, index: number) => {
    return <Picker.Item key={index} label={item.name} value={index} />;
  };
  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };

  const initRobberyList = async () => {
    await dispatch(Actions.homepageActions.GetRobberyList());
  };
  const robThis = () => {
    axios
      .get(ROBBERY_RUN_URL + selectedRob)
      .then((res) => {
        console.log(res.data.status);
        if (res.data.status === "success") {
          const message =
            res.data.message +
            "\nKazanılan Ödül:\n" +
            "Cash: $" +
            res.data.rewards.cash +
            "\nItem: " +
            JSON.stringify(res.data.rewards.item);
          Alert.alert("BAŞARILI", message, [
            { text: "Tamam", onPress: () => null },
          ]);
        } else {
          Alert.alert("Ops.", res.data.message, [
            { text: "Tamam", onPress: () => null },
          ]);
        }
        initHeader();
        initRobberyList();
      })
      .catch((error) => console.log("err", error.response.data));
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
      >
        <Text style={{ textAlign: "center", justifyContent: "center" }}>
          Soygun Yap
        </Text>
      </TouchableOpacity>
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
});
