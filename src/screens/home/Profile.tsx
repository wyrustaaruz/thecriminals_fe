import { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header, SubHeader, LastHeader } from "../../components";
import {
  Button,
  Loading,
  MyModal,
  Picker,
  Text,
  TextInput,
  View,
} from "../../components/PureComponents";
import DatePicker from "react-native-datepicker";
import Colors from "../../constants/Colors";
import Actions from "../../redux/actions";
import SelectAvatar from "../auth/SelectAvatar";
import axios from "axios";
import { UPDATE_PROFILE_URL } from "../../redux/endpoints";

export default function Profile({ navigation }: any) {
  const dispatch = useDispatch();

  const loading = useSelector((state: any) => state.commonReducers.loading);
  const profile = useSelector((state: any) => state.homepageReducers.profile);
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const fetchAvatar = characterInfo.avatar
    .split("/avatars/")[1]
    .split(".png")[0];
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(
    characterInfo.gender !== "none" ? characterInfo.gender : "male"
  );
  const [selectedAvatar, setSelectedAvatar] = useState({
    name: fetchAvatar,
    url: characterInfo.avatar,
  });
  const [biography, setBiography] = useState(characterInfo.bio);
  const [date, setDate] = useState(new Date(characterInfo.birthday));
  const [items, setItems] = useState([
    { label: "Erkek", value: "male" },
    { label: "Kadın", value: "female" },
  ]);
  const [avatarModal, setAvatarModal] = useState(false);

  const selectedAvatarFunction = (item: any) => {
    setSelectedAvatar(item);
    setAvatarModal(false);
  };

  const onChange = (event: any, selectedDate: any) => {
    setDate(selectedDate);
  };

  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };
  const initProfile = async (userID: number) => {
    await dispatch(Actions.homepageActions.GetProfile(userID));
  };

  useEffect(() => {
    initHeader();
  }, []);

  useEffect(() => {
    if (characterInfo.user_id) {
      initProfile(characterInfo.user_id);
    }
  }, [characterInfo]);

  const saveProfile = () => {
    let tempBirthday = "";
    if (date) {
      tempBirthday = date.toJSON().toString().split("T")[0];
    }
    const resuestObject = {
      avatar: selectedAvatar.name,
      gender: gender,
      bio: biography,
      birthday: tempBirthday,
    };
    axios.post(UPDATE_PROFILE_URL, resuestObject).then(() => initHeader());
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loading status={loading} />
      <View>{Header(characterInfo, navigation)}</View>
      <View>{SubHeader(characterInfo, navigation)}</View>
      <View>{LastHeader(characterInfo)}</View>
      <View style={{ flex: 1, margin: 10 }}>
        <View style={{ marginVertical: 10 }}>
          <Text>Hoşgeldin {characterInfo.user.username},</Text>
          <Text>Genel Oyun İstatistiklerin:</Text>
        </View>
        <View style={{ marginBottom: 10, alignSelf: "center" }}>
          <Text>Oynama zamanı: {profile.play_time} Dakika</Text>
          <Text>Profil Ziyaretçilerin: {profile.visitors}</Text>
          <Text>Toplam Kill: {profile.kill}</Text>
          <Text>
            Bize Katılma Tarihin:{" "}
            {new Date(profile.created_at).toLocaleDateString("tr")}
          </Text>
        </View>
        <Text>Aşağıdan bilgilerini değiştirebilirsin.</Text>
        <View style={styles.itemContainer}>
          <Text style={{ flex: 1 }}>Avatar:</Text>
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setAvatarModal(true)}
          >
            <Image
              style={styles.tinyLogo}
              source={{
                uri: selectedAvatar.url,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={[{ zIndex: 9999 }, styles.itemContainer]}>
          <Text>Cinsiyet:</Text>
          <Picker
            open={open}
            value={gender}
            items={items}
            setOpen={setOpen}
            setValue={setGender}
            setItems={setItems}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text>Biyografi:</Text>
          <TextInput
            style={styles.input}
            value={biography}
            placeholder="Biyografi"
            placeholderTextColor={Colors.LightGold}
            onChangeText={(value: string) => {
              setBiography(value);
            }}
          />
        </View>
        <View style={styles.itemContainer}>
          <Text style={{ flex: 1 }}>Doğum Tarihi:</Text>
          <DatePicker
            style={styles.datePickerStyle}
            date={date}
            mode="date"
            placeholder="Doğum tarihi seç"
            format="DD-MM-YYYY"
            maxDate="01-01-2004"
            confirmBtnText="Onayla"
            cancelBtnText="Vazgeç"
            showIcon={false}
            customStyles={{
              dateInput: {
                borderColor: Colors.Gold,
                borderRadius: 8,
              },
              dateText: {
                color: Colors.Gold,
              },
            }}
            locale="tr"
            onDateChange={onChange}
          />
        </View>
      </View>
      <MyModal
        visible={avatarModal}
        onRequestClose={() => setAvatarModal(false)}
      >
        <SelectAvatar
          selectedAvatarFunction={(item: any) => selectedAvatarFunction(item)}
          selected={selectedAvatar}
        />
      </MyModal>
      <Button style={{ marginHorizontal: 20 }} onPress={() => saveProfile()}>
        <Text type="button" style={styles.centeredText}>
          Kaydet
        </Text>
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGray,
  },
  itemContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tinyLogo: {
    width: 70,
    height: 70,
  },
  input: {
    width: "50%",
    color: Colors.Gold,
    padding: 10,
    borderWidth: 1,
  },
  centeredText: {
    textAlign: "center",
  },
  datePickerStyle: {
    flex: 1,
  },
});
