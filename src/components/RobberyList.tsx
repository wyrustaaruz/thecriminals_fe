import { StyleSheet } from "react-native";
import { Text, View } from "./PureComponents";
import { Picker } from "@react-native-community/picker";
import { useState } from "react";

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
  const [selectedRob, setSelectedRob] = useState(0);
  const RobberyItemRender = (item: RobberyItem, index: number) => {
    return <Picker.Item key={index} label={item.name} value={index} />;
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
          backgroundColor: "black",
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
            {robberyList[selectedRob].reward_cash_min} -{" "}
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
