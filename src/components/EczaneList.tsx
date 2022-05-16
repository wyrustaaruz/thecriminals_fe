import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import axios from "axios";
import _ from "lodash";
import { Text, View, MyModal, Button, TextInput } from "./PureComponents";
import { ECZANE_BUY_URL } from "../redux/endpoints";
import { useDispatch } from "react-redux";
import Actions from "../redux/actions";
import LottieView from "lottie-react-native";
import Colors from "../constants/Colors";
import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";

type EczaneItem = {
  value: number;
  name?: string;
  attr?: string;
  attr_value?: number;
  price?: number;
};
type EczaneItemType = {
  item: EczaneItem;
};

export const EczaneList = (eczaneList: Array<EczaneItem>) => {
  const dispatch = useDispatch();
  const [textInputs, setTextInputs] = useState<any>([]);
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

  const getThis = async (value: number) => {
    loadingTrue();
    axios
      .post(ECZANE_BUY_URL + value, {
        count: textInputs[value] ? textInputs[value] : "1",
      })
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

  const ChemicalItem = ({ item }: EczaneItemType) => {
    const lottieImages = [
      require("../../assets/lotties/morhap.json"),
      require("../../assets/lotties/yesilhap.json"),
      require("../../assets/lotties/kirmizihap.json"),
      require("../../assets/lotties/siyahhap.json"),
      require("../../assets/lotties/medicine.json"),
    ];
    let randIndex = item.value || 0;
    randIndex = randIndex !== 0 ? randIndex - 1 : randIndex;
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
          <LottieView
            style={{
              width: 50,
              height: 50,
              backgroundColor: "transparent",
            }}
            autoPlay={true}
            loop={true}
            source={lottieImages[randIndex]}
          />
        </View>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            flex: 3,
          }}
        >
          <Text style={{ fontWeight: "600", color: Colors.White }}>
            {item.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: Colors.White }}>Etki: </Text>
            <Text>{`${item.attr} (${item.attr_value})`}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: Colors.White }}>Ücret: </Text>
            <Text>${item.price}</Text>
          </View>
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
            style={{ marginBottom: 5 }}
            onPress={() => getThis(item.value)}
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
      {eczaneList.length > 0 && (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <KeyboardAwareFlatList
            style={{ flex: 1 }}
            data={eczaneList}
            renderItem={({ item }) => (
              <ChemicalItem key={item.value} item={item} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
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
