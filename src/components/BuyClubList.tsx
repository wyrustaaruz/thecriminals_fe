import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import axios from "axios";
import _ from "lodash";
import { Text, View, MyModal, Button } from "./PureComponents";
import { CLUB_BUY_URL } from "../redux/endpoints";
import { useDispatch } from "react-redux";
import Actions from "../redux/actions";
import LottieView from "lottie-react-native";
import Colors from "../constants/Colors";

type ClubItem = {
  value: number;
  label: string;
  img: string;
  ticket_price: number;
  price: number;
};

type ItemType = {
  item: ClubItem;
};

export const BuyClubList = (clubList: Array<ClubItem>) => {
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
  const initOwnClubs = async () => {
    await dispatch(Actions.homepageActions.GetOwnClubList());
  };

  const buyItem = async (value: number) => {
    loadingTrue();
    axios
      .get(CLUB_BUY_URL + value)
      .then((res) => {
        const tempModalChild = () => (
          <View>
            <Text style={styles.centeredText}>{res.data.message}</Text>
          </View>
        );
        setModalChild(tempModalChild);
        setModalShown(true);
        initHeader();
        initOwnClubs();
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

  const ClubItem = ({ item }: ItemType) => {
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
          <Text style={{ fontWeight: "600", color: Colors.White }}>
            {item.label}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={{ color: Colors.White }}>Fiyat: </Text>
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
      </View>
    );
  };
  return (
    <View style={styles.headerContainer}>
      {clubList.length > 0 && (
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            {clubList.map((item) => (
              <ClubItem key={item.value} item={item} />
            ))}
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
