import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FromUserChat = ({ message }) => {
  return (
    <View style={styles.messageWrapperRight}>
      <View style={styles.messageBubbleRight}>
        <Text>{message.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageWrapperRight: {
    display: "flex",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  messageBubbleRight: {
    backgroundColor: "#68B0AB",
    padding: 10,
    width: "50%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
export default FromUserChat;
