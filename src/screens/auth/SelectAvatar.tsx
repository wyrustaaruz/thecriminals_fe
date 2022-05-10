import { useState, useEffect } from "react";
import { Image, StyleSheet, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Loading, Text, View } from "../../components/PureComponents";
import Colors from "../../constants/Colors";
import Actions from "../../redux/actions";

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

  useEffect(() => {
    initHeader();
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.LightGray }}>
      <Loading status={loading} />
      <View style={styles.container}>
        <View style={styles.childrenContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoText}>Avatar Seç</Text>
            <View
              style={{
                flex: 1,
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {avatarList ? (
                avatarList.length > 1 ? (
                  avatarList.map((item: any, index: number) => (
                    <TouchableOpacity
                      style={{ margin: 1 }}
                      key={index}
                      onPress={() => {
                        setSelectedAvatar(item);
                        selectedAvatarFunction(item);
                      }}
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
                  ))
                ) : (
                  <View style={{ width: 1200 }} />
                )
              ) : (
                <View style={{ width: 1200 }} />
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGray,
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
  childrenContent: { flex: 1, marginHorizontal: 30 },
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
