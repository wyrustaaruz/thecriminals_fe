import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header, SubHeader, LastHeader } from "../../components";
import {
  Button,
  Loading,
  MyModal,
  Text,
  View,
} from "../../components/PureComponents";
import Colors from "../../constants/Colors";
import Actions from "../../redux/actions";
import LottieView from "lottie-react-native";
import { CLUB_BUY_ITEM_URL } from "../../redux/endpoints";

export default function InClub(props: any, { navigation }: any) {
  const { clubId } = props.route.params;
  const dispatch = useDispatch();
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const loading = useSelector((state: any) => state.commonReducers.loading);

  const clubItems = useSelector(
    (state: any) => state.homepageReducers.clubItems
  );
  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };

  const initClubItems = async () => {
    await dispatch(Actions.homepageActions.GetClubItems(clubId));
  };

  const loadingTrue = async () => {
    await dispatch(Actions.commonActions.LoadingTrue());
  };

  const loadingFalse = async () => {
    await dispatch(Actions.commonActions.LoadingFalse());
  };
  const [modalShown, setModalShown] = useState(false);
  const [modalChild, setModalChild] = useState(<></>);
  useEffect(() => {
    initHeader();
    initClubItems();
  }, []);
  const buyItem = (item: any) => {
    if (item.count <= 0) {
      console.log("yeterli içecek kalmadı");
    } else {
      loadingTrue();
      axios
        .get(CLUB_BUY_ITEM_URL + clubId)
        .then((res) => {
          const tempModalChild = () => (
            <View>
              <Text style={styles.centeredText}>{res.data.message}</Text>
            </View>
          );
          setModalChild(tempModalChild);
          setModalShown(true);
          initHeader();
          initClubItems();
        })
        .catch((err) => {
          loadingFalse();
          const message = err.response.data.message;
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
                source={require("../../../assets/lotties/boss.json")}
              />
              <Text style={styles.centeredText}>Opss.</Text>
              <Text style={styles.centeredText}>{message}</Text>
            </View>
          );
          setModalChild(tempModalChild);
          setModalShown(true);
        });
    }
    console.log("hasan");
  };
  const ClubItem = ({ item }: any) => {
    return (
      <View
        style={{
          backgroundColor: Colors.DarkGray,
          margin: 10,
          padding: 20,
          borderRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: Colors.White, fontWeight: "600" }}>
            {`${item.value} ${item.count} ad.
          `}
          </Text>
          <Button onPress={() => buyItem(item.count)}>
            <Text type="button"> Satın Al</Text>
          </Button>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loading status={loading} />
      <View>{Header(characterInfo, navigation)}</View>
      <View>{SubHeader(characterInfo, navigation)}</View>
      <View>{LastHeader(characterInfo)}</View>
      <View style={{ flex: 1 }}>
        {!_.isEmpty(clubItems) ? <ClubItem item={clubItems} /> : null}
      </View>
      <MyModal visible={modalShown} onRequestClose={() => setModalShown(false)}>
        {modalChild}
      </MyModal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGray,
  },
  centeredText: {
    textAlign: "center",
  },
});
