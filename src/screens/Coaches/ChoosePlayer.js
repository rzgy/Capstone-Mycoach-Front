import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
const ChoosePlayer = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#182026",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 32, fontWeight: "bold" }}>
        Choose Athlete
      </Text>
    </View>
  );
};

export default ChoosePlayer;

const styles = StyleSheet.create({});
