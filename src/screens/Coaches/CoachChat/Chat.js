import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";

const Chat = ({ route }) => {
  const { userID } = route.params;

  return (
    <ScrollView style={{ flex: 1, padding: 10, backgroundColor: "#182026" }}>
      <View
        style={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            backgroundColor: "#68B0AB",
            display: "flex",
            alignItems: "flex-end",
            padding: 10,
            width: "50%",
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          <Text>From Coach</Text>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <View
          style={{
            backgroundColor: "gray",
            display: "flex",
            alignItems: "flex-end",
            padding: 10,
            width: "50%",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <Text>From Coach</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Chat;

const styles = StyleSheet.create({});
