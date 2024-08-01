import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MyChat = ({ message }) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          backgroundColor: "green",
          width: "40%",
          padding: 10,
          borderRadius: 10,
        }}
      >
        <Text>{message}</Text>
      </View>
    </View>
  );
};

export default MyChat;
