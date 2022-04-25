import axios from "axios";
import { useState, useRef, useEffect } from "react";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Loading, Text, View } from "../../components/PureComponents";
import Actions from "../../redux/actions";
import { CREATE_CHARACTER_URL } from "../../redux/endpoints";

export default function SelectAvatar({
  selectedAvatarFunction,
  selected,
}: any) {
  const dispatch = useDispatch();
  const loading = useSelector((state: any) => state.commonReducers.loading);

  const [selectedAvatar, setSelectedAvatar] = useState({ name: "", url: "" });
  useEffect(() => {
    selected ? setSelectedAvatar(selected) : null;
  }, []);
  const avatarList =
    useSelector((state: any) => state.authReducers.avatarList) || {};
  const initHeader = async () => {
    await dispatch(Actions.authActions.GetAvatars());
  };
  const loadingTrue = async () => {
    await dispatch(Actions.commonActions.LoadingTrue());
  };
  const loadingFalse = async () => {
    await dispatch(Actions.commonActions.LoadingFalse());
  };
  const handleSelectAvatar = () => {
    if (selectedAvatar.name) {
      selectedAvatarFunction(selectedAvatar);
      return;
      loadingTrue();
      axios
        .post(CREATE_CHARACTER_URL, { avatar: selectedAvatar })
        .then((res) => {
          if (res.data.status === "success") {
            Alert.alert("BAŞARILI", "Avatar seçildi", [
              { text: "Tamam", onPress: () => null },
            ]);
          } else {
            Alert.alert("Ops.", res.data.message, [
              { text: "Tamam", onPress: () => null },
            ]);
          }
          initHeader();
        })
        .catch((error) => {
          Alert.alert("Bir Sorun Oluştu", error.response.data.message, [
            { text: "Tamam", onPress: () => null },
          ]);
          loadingFalse();
        });
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
      <Loading status={loading} />
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
                <TouchableOpacity
                  style={{ margin: 1 }}
                  key={index}
                  onPress={() => setSelectedAvatar(item)}
                >
                  <Image
                    style={[
                      styles.tinyLogo,
                      selectedAvatar.name === item.name
                        ? styles.selected
                        : null,
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
