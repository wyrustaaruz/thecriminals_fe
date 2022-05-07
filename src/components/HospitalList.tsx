import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import _ from "lodash";
import { Text, View, MyModal, Picker } from "./PureComponents";
import { ROBBERY_RUN_URL } from "../redux/endpoints";
import { useDispatch } from "react-redux";
import Actions from "../redux/actions";
import LottieView from "lottie-react-native";

interface HospitalItem {
  value?: number;
  name?: string;
  attr?: string;
  attr_value?: number;
  price?: number;
}
type JailStatusType = {
  block: boolean;
  message: string;
};

export const HospitalList = (
  hospitalList: Array<HospitalItem>,
  jailStatus: JailStatusType
) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(null);
  const [modalShown, setModalShown] = useState(false);
  const [modalChild, setModalChild] = useState(<></>);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<HospitalItem>({});

  useEffect(() => {
    setSelectedItem(
      hospitalList.filter((item) => {
        return item.value === value;
      })[0]
    );
  }, [value]);

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
        hospitalList.length > 1 && (
          <View style={{ flex: 1, justifyContent: "space-between" }}>
            <View
              style={{
                paddingVertical: 20,
              }}
            >
              <Picker
                containerStyle={{ width: "100%" }}
                open={open}
                value={value}
                items={hospitalList}
                setOpen={setOpen}
                setValue={setValue}
                schema={{
                  label: "name",
                  value: "value",
                }}
              />
            </View>
            {!_.isEmpty(selectedItem) && (
              <View
                style={{
                  zIndex: -1,
                  backgroundColor: "#333333",
                  padding: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>İsim:</Text>
                  <Text>{selectedItem.name}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Stat:</Text>
                  <Text>{selectedItem.attr}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Miktar:</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>{selectedItem.attr_value}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>Ücret:</Text>
                  <Text>${selectedItem.price}</Text>
                </View>
              </View>
            )}
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
                Satın Al
              </Text>
            </TouchableOpacity>
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
    backgroundColor: "#464646",
    padding: 20,
  },
  centeredText: {
    textAlign: "center",
  },
});
