import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ChatCard = ({ image, chatname, message, time, chatID, toID }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{
        height: 100,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        backgroundColor: "#f9f9f9",
      }}
      onPress={() =>
        navigation.navigate("chat", {
          id: chatID,
          toID: toID,
        })
      }
    >
      <Image
        source={{
          uri: image,
        }}
        style={{
          height: 80,
          width: 80,
          borderRadius: 50,
          marginRight: 20,
        }}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 18,
            }}
          >
            {chatname}
          </Text>
          <Text>Hello</Text>
          <Text>{message}</Text>
        </View>

        <Text>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;
