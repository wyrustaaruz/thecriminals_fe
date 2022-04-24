import React, { useEffect, useRef, useState } from "react";
import FirebaseStorage from "../data/FirebaseStorage";
import { SafeAreaView } from "react-native";
import {
  GiftedChat,
  IMessage,
  User,
  InputToolbar,
  Composer,
  Send,
  Bubble,
} from "react-native-gifted-chat";
import { Text, View } from "../components/PureComponents";
import { useSelector } from "react-redux";

const ChatScreen: any = (props: any) => {
  const characterInfo =
    useSelector((state: any) => state.homepageReducers.header) || {};
  const [messages, setMessages] = useState<IMessage[]>([]);
  const prevMessages = useRef<IMessage[]>([]);
  const user = {
    name: characterInfo.user.username,
    _id: characterInfo.id,
    avatar: characterInfo.avatar,
  } as User;
  useEffect(() => {
    FirebaseStorage.on((messages: any): any => {
      const newMessages = GiftedChat.append(prevMessages.current, messages);
      prevMessages.current = newMessages;
      setMessages(newMessages);
    });
    return function cleanup() {
      FirebaseStorage.off();
    };
  }, []);
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
    <SafeAreaView style={{ flex: 1 }}>
      <GiftedChat
        messagesContainerStyle={{ backgroundColor: "#464646" }}
        placeholder="Mesajını yaz"
        renderSend={(props) => renderSend(props)}
        renderUsernameOnMessage
        messages={messages}
        onSend={FirebaseStorage.send}
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

export default ChatScreen;
