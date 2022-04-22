import axios from "axios";
import { useState, useRef, useEffect } from "react";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { TouchableOpacity, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Text, View } from "../../components/PureComponents";
import Actions from "../../redux/actions";
import { CREATE_CHARACTER_URL } from "../../redux/endpoints";

export default function SelectAvatar({ navigation }: any) {
  const dispatch = useDispatch();
  const [selectedAvatar, setSelectedAvatar] = useState("");

  const avatarList =
    useSelector((state: any) => state.authReducers.avatarList) || {};

  const initHeader = async () => {
    await dispatch(Actions.authActions.GetAvatars());
  };
  const handleSelectAvatar = () => {
    if (selectedAvatar) {
      axios
        .post(CREATE_CHARACTER_URL, { avatar: selectedAvatar })
        .then((res) => {
          console.log(res.data.status);
          if (res.data.status === "success") {
            const message =
              res.data.message +
              "\nKazanılan Ödül:\n" +
              "Cash:" +
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
        })
        .catch((error) => console.log("err", error.response.data));
    } else {
      Alert.alert("HATA", "Lütfen avatar seçtiğinize emin olunuz", [
        { text: "Tamam", onPress: () => null },
      ]);
    }
  };

  useEffect(() => {
    initHeader();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "#464646" }}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>The Criminals</Text>
        </View>
        <View style={styles.inputAreaContent}>
          <View>
            <Text style={styles.infoText}>Avatar Seç</Text>
            <View
              style={{
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {avatarList.map((item: any, index: number) => (
                <TouchableOpacity onPress={() => setSelectedAvatar(item.name)}>
                  <Image
                    key={index}
                    style={[
                      styles.tinyLogo,
                      selectedAvatar === item.name ? styles.selected : null,
                    ]}
                    source={{
                      uri: item.url,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.signupContainer}
              onPress={handleSelectAvatar}
            >
              <Text style={styles.signupText}>Avatar Seç</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#464646",
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  infoText: {
    textAlign: "center",
    marginVertical: 20,
  },
  inputAreaContent: { marginHorizontal: 30 },
  signupContainer: { marginVertical: 15, borderWidth: 1 },
  signupText: {
    padding: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    color: "#C0B184",
    padding: 10,
    borderWidth: 1,
  },
  selected: {
    borderWidth: 2,
    borderColor: "green",
  },
  nonSelected: {
    borderWidth: 2,
    borderColor: "red",
  },
  tinyLogo: {
    width: 70,
    height: 70,
  },
});
