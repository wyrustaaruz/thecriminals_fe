import axios from "axios";
import { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header, SubHeader, LastHeader } from "../../components";
import { Button, Loading, Text, View } from "../../components/PureComponents";
import Colors from "../../constants/Colors";
import Actions from "../../redux/actions";
import {
  ADD_FRIEND_URL,
  APPROVE_FRIEND_URL,
  REJECT_FRIEND_URL,
} from "../../redux/endpoints";

export type CharacterItemType = {
  avatar: string;
  country: string;
  gender: string;
  id: number;
  respect: number;
  user_id: number;
};
export type FriendItemType = {
  character: CharacterItemType;
  created_at: string;
  id: number;
  relationStatus: string;
  username: string;
  status: string;
};
export type FriendType = {
  item: FriendItemType;
};

export default function Friendship({ navigation }: any) {
  const dispatch = useDispatch();
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const friendshipList =
    useSelector((state: any) => state.homepageReducers.friendshipList) || {};
  const friendshipWaitList =
    useSelector((state: any) => state.homepageReducers.friendshipWaitList) ||
    {};
  const loading = useSelector((state: any) => state.commonReducers.loading);

  const initHeader = async () => {
    await dispatch(Actions.homepageActions.GetHeader());
  };

  const initWaitFriendshipList = async () => {
    await dispatch(Actions.homepageActions.GetComingFriendshipList());
  };

  const initFriendshipList = async () => {
    await dispatch(Actions.homepageActions.GetFriendshipList());
  };

  useEffect(() => {
    initHeader();
    initFriendshipList();
    initWaitFriendshipList();
  }, []);

  const handleAskFriendship = (id: number) => {
    axios
      .post(ADD_FRIEND_URL, { id })
      .then((res) => {
        Alert.alert(res.data.message);
        initFriendshipList();
      })
      .catch((err) => {
        Alert.alert(err.response.data.message);
      });
  };
  const handleApproveFriendship = (id: number) => {
    axios
      .post(APPROVE_FRIEND_URL, { id })
      .then((res) => {
        Alert.alert(res.data.message);
        initFriendshipList();
        initWaitFriendshipList();
      })
      .catch((err) => {
        Alert.alert(err.response.data.message);
      });
  };
  const handleRejectFriendship = (id: number) => {
    axios
      .post(REJECT_FRIEND_URL, { id })
      .then((res) => {
        Alert.alert(res.data.message);
        initFriendshipList();
        initWaitFriendshipList();
      })
      .catch((err) => {
        Alert.alert(err.response.data.message);
      });
  };
  const RelationStatusButton = ({ item }: FriendType) => {
    if (item.relationStatus === "none") {
      return (
        <Button type="button" onPress={() => handleAskFriendship(item.id)}>
          <Text type="button">İstek Gönder</Text>
        </Button>
      );
    } else if (item.relationStatus === "waiting") {
      return (
        <Button type="button" onPress={() => null}>
          <Text type="button">Beklemede</Text>
        </Button>
      );
    } else if (item.relationStatus === "approved") {
      return (
        <Button type="button" onPress={() => null}>
          <Text type="button">Arkadaşsın</Text>
        </Button>
      );
    } else if (item.status === "waiting") {
      return (
        <View>
          <Button
            type="button"
            style={{ marginVertical: 5 }}
            onPress={() => handleApproveFriendship(item.id)}
          >
            <Text type="button">Onayla</Text>
          </Button>
          <Button
            type="danger"
            style={{ marginVertical: 5 }}
            onPress={() => handleRejectFriendship(item.id)}
          >
            <Text type="danger">Reddet</Text>
          </Button>
        </View>
      );
    }
  };
  const FriendComponent = ({ item }: FriendType) => {
    const friendRightContainer = StyleSheet.create({
      container: {
        flex: 1,
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      image: {
        width: 50,
        height: 50,
        borderRadius: 50,
      },
      text: {
        flexWrap: "wrap",
        color: Colors.Gold,
      },
    });
    return (
      <View
        key={item.id}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 10,
          borderBottomWidth: 1,
          margin: 5,
          borderRadius: 8,
          backgroundColor: Colors.DarkGray,
        }}
      >
        <View style={friendRightContainer.container}>
          <View style={friendRightContainer.image}>
            {item.character ? (
              <Image
                style={friendRightContainer.image}
                source={{
                  uri:
                    "https://thecriminals.yazilim.online/images/avatars/" +
                    item.character.avatar +
                    ".png",
                }}
              />
            ) : null}
          </View>
          <View style={friendRightContainer.container}>
            <View>
              <Text style={friendRightContainer.text}>{item.username}</Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={[friendRightContainer.text, { marginBottom: 10 }]}>
              Saygınlık {item.character ? item.character.respect : 0}
            </Text>
            {RelationStatusButton({ item })}
          </View>
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
      <ScrollView style={{ flex: 1 }}>
        <Text style={{ paddingLeft: 15, paddingTop: 15 }}>Arkadaşların</Text>
        {friendshipWaitList &&
        friendshipWaitList.data &&
        friendshipWaitList.data.length > 0
          ? friendshipWaitList.data.map((item: FriendItemType) => (
              <FriendComponent item={item} />
            ))
          : null}
        <Text style={{ paddingLeft: 15, paddingTop: 15 }}>
          Önerilen Arkadaşlar
        </Text>
        {friendshipList && friendshipList.data && friendshipList.data.length > 0
          ? friendshipList.data.map((item: FriendItemType) => (
              <FriendComponent item={item} />
            ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.LightGray,
  },
});
