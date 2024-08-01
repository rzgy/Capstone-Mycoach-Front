import { StyleSheet, Text, View } from "react-native";
import React from "react";

const UserChat = ({ message }) => {
  return (
    <View style={styles.messageWrapperLeft}>
      <View style={styles.messageBubbleLeft}>
        <Text>{message.content}</Text>
      </View>
    </View>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  messageWrapperLeft: {
    display: "flex",
    alignItems: "flex-start",
    marginVertical: 5,
  },
  messageBubbleLeft: {
    backgroundColor: "gray",
    padding: 10,
    width: "50%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
