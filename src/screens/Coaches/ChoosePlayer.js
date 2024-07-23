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
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 20,
          backgroundColor: "#101518",
          borderRadius: 100,
          width: 40,
          height: 40,
        }}
      >
        <Button title="<" color={"black"} onPress={() => navigation.goBack()} />
      </View>
      <Text style={{ color: "white", fontSize: 32, fontWeight: "bold" }}>
        Hi Ali
      </Text>
    </View>
  );
};

export default ChoosePlayer;

const styles = StyleSheet.create({});
