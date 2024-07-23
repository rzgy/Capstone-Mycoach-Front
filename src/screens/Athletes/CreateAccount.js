import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Register from "./CreatAccount/Register";

const CreateAccount = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 80,
        backgroundColor: "#182026",
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          color: "white",
        }}
      >
        CreateAccount
      </Text>
      <View>
        <Register />
      </View>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({});
