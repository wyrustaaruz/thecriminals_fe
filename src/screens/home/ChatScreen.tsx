import React, { useEffect, useRef, useState } from "react";
import FirebaseStorage from "../../data/FirebaseStorage";
import { SafeAreaView, StyleSheet } from "react-native";
import {
  GiftedChat,
  IMessage,
  User,
  InputToolbar,
  Composer,
  Send,
  Bubble,
} from "react-native-gifted-chat";
import { Text, View } from "../../components/PureComponents";
import { useSelector } from "react-redux";
import { Header } from "../../components";

const ChatScreen: any = (props: any) => {
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chatRoomState, setChatRoomState] = useState("");
  const prevMessages = useRef<IMessage[]>([]);
  const user = {
    name: characterInfo.user.username,
    _id: characterInfo.id,
    avatar: characterInfo.avatar,
  } as User;
  useEffect(() => {
    setMessages([]);
    let chatRoom = "";
    if (characterInfo.block === 0) {
      chatRoom = "normal";
    } else if (characterInfo.block === 1) {
      chatRoom = "hospital";
    } else if (characterInfo.block === 2) {
      chatRoom = "jail";
    }
    setChatRoomState(chatRoom);
    FirebaseStorage.on((messages: any): any => {
      const newMessages = GiftedChat.append(prevMessages.current, messages);
      prevMessages.current = newMessages;
      setMessages(newMessages);
    }, chatRoom);
    return function cleanup() {
      FirebaseStorage.off();
    };
  }, [characterInfo]);
  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        containerStyle={{ backgroundColor: "black" }}
        primaryStyle={{ color: "red" }}
        {...props}
      />
    );
  };
  const renderComposer = (props: any) => {
    return (
      <Composer
        {...props}
        textInputStyle={{ color: "#C0B184" }}
        placeholderTextColor="#C0B184"
      />
    );
  };
  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View
          style={{
            marginRight: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ textAlign: "center" }}>Gönder</Text>
        </View>
      </Send>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>{Header(characterInfo, props.navigation)}</View>
      <GiftedChat
        messagesContainerStyle={{ backgroundColor: "#464646" }}
        placeholder="Mesajını yaz"
        renderSend={(props) => renderSend(props)}
        renderUsernameOnMessage
        messages={messages}
        onSend={(item) => FirebaseStorage.send(item, chatRoomState)}
        user={user}
        renderInputToolbar={renderInputToolbar}
        renderComposer={(props) => renderComposer(props)}
        renderBubble={(props) => {
          return (
            <Bubble
              {...props}
              wrapperStyle={{
                left: { backgroundColor: "#333333" },
                right: { backgroundColor: "black" },
              }}
              textStyle={{
                right: {
                  padding: 10,
                  color: "#C0B184",
                },
                left: {
                  padding: 10,
                  color: "#C0B184",
                },
              }}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#464646",
  },
});

export default ChatScreen;
