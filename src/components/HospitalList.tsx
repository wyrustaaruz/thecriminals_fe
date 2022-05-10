import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import _ from "lodash";
import { Text, View, MyModal, Picker } from "./PureComponents";
import { HOSPITAL_BUY_URL } from "../redux/endpoints";
import { useDispatch, useSelector } from "react-redux";
import Actions from "../redux/actions";
import LottieView from "lottie-react-native";
import Colors from "../constants/Colors";

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
  const chemicalResponse =
    useSelector((state: any) => state.homepageReducers.chemicalResponse) || {};

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

  const loadingTrue = async () => {
    await dispatch(Actions.commonActions.LoadingTrue());
  };

  const loadingFalse = async () => {
    await dispatch(Actions.commonActions.LoadingFalse());
  };

  const robThis = async () => {
    if (!_.isEmpty(selectedItem)) {
      loadingTrue();
      axios
        .get(HOSPITAL_BUY_URL + selectedItem.value)
        .then((res) => {
          const lottieImages = [
            require("../../assets/lotties/morhap.json"),
            require("../../assets/lotties/yesilhap.json"),
            require("../../assets/lotties/kirmizihap.json"),
            require("../../assets/lotties/siyahhap.json"),
            require("../../assets/lotties/medicine.json"),
          ];
          let randIndex = selectedItem.value || 0;
          randIndex = randIndex !== 0 ? randIndex - 1 : randIndex;
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
          <Text style={styles.centeredText}>Sanırım seçim yapmayı unuttun</Text>
        </View>
      );
      setModalChild(tempModalChild);
      setModalShown(true);
    }
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
                  backgroundColor: Colors.DarkGray,
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
                borderColor: Colors.Gold,
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
    backgroundColor: Colors.LightGray,
    padding: 20,
  },
  centeredText: {
    textAlign: "center",
  },
});
