import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Welcome to My Coach App \n How can i help you!",
        createdAt: new Date(),

        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://pbs.twimg.com/media/BtFUrp6CEAEmsml.jpg",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#7b2cbf",
        },
        left: {
          backgroundColor: "#f0f0f0",
        },
      }}
    />
  );

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        borderTopWidth: 1,
        borderTopColor: "#E8E8E8",
      }}
    />
  );

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 2,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6898ab",
  },
});

export default ChatApp;
