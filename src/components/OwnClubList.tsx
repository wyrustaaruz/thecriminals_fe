import { useState } from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import axios from "axios";
import _ from "lodash";
import { Text, View, MyModal, Button } from "./PureComponents";
import { CLUB_COLLECT_URL, CLUB_SELL_URL } from "../redux/endpoints";
import { useDispatch } from "react-redux";
import Actions from "../redux/actions";
import LottieView from "lottie-react-native";
import Colors from "../constants/Colors";

type ClubItem = {
  id: number;
  value: number;
  label: string;
  img: string;
  price: number;
  total_earning: number;
};

type ItemType = {
  item: ClubItem;
};
type JailStatusType = {
  block: boolean;
  message: string;
};

export const OwnClubList = (
  navigation: any,
  clubList: Array<ClubItem>,
  jailStatus: JailStatusType
) => {
  const dispatch = useDispatch();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [modalShown, setModalShown] = useState(false);
  const [modalChild, setModalChild] = useState(<></>);

  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };

  const initClubs = async () => {
    await dispatch(Actions.homepageActions.GetClubList());
  };

  const initOwnClubs = async () => {
    await dispatch(Actions.homepageActions.GetOwnClubList());
  };

  const loadingTrue = async () => {
    await dispatch(Actions.commonActions.LoadingTrue());
  };

  const loadingFalse = async () => {
    await dispatch(Actions.commonActions.LoadingFalse());
  };

  const collectMoney = async (id: number) => {
    loadingTrue();
    axios
      .get(CLUB_COLLECT_URL + id)
      .then((res) => {
        const tempModalChild = () => (
          <View>
            <Text style={styles.centeredText}>{res.data.message}</Text>
          </View>
        );
        setModalChild(tempModalChild);
        setModalShown(true);
        initHeader();
        initClubs();
        initOwnClubs();
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
  const ConfirmationModal = (item: ClubItem) => {
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
              onPress={() => sellItem(item.id)}
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
  const sellItem = async (id: number) => {
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
        initClubs();
        initOwnClubs();
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

  const enterClub = (clubId: number) => {
    navigation.navigate("InClub");
  };

  const jailGifs = [
    require("../../assets/lotties/jail.gif"),
    require("../../assets/lotties/jail2.gif"),
  ];
  let randJailIndex = Math.floor(Math.random() * jailGifs.length);

  const ClubItem = ({ item }: ItemType) => {
    return (
      <View
        key={item.id}
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
          <Text>Toplam Kazanç: {item.total_earning}</Text>
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
            onPress={() => enterClub(item.id)}
          >
            <Text style={{ textAlign: "center", justifyContent: "center" }}>
              Giriş Yap
            </Text>
          </Button>
          <Button
            style={{ marginBottom: 5 }}
            onPress={() => collectMoney(item.id)}
          >
            <Text style={{ textAlign: "center", justifyContent: "center" }}>
              Kazancı Topla
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
        clubList.length > 0 && (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View>
              <FlatList
                data={clubList}
                renderItem={({ item }) => (
                  <ClubItem key={item.id} item={item} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
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
