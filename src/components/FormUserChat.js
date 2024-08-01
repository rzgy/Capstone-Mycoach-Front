import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FromUserChat = ({ message }) => {
  return (
    <View
      style={{
        backgroundColor: "lightgray",
        width: "40%",
        padding: 10,
        borderRadius: 10,
      }}
    >
      <Text>{message}</Text>
    </View>
  );
};

export default FromUserChat;
