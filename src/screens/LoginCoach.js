import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getHeaderTitle } from "@react-navigation/elements";
// ..
const LoginCoach = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#182026",
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
        <Button title="<" color={"white"} onPress={() => navigation.goBack()} />
      </View>

      <Text
        style={{
          color: "white",
          fontSize: 32,
          fontWeight: "bold",
          margin: 50,
          marginTop: 150,
          marginLeft: 25,
        }}
      >
        Login
      </Text>
      {/* Email Input */}
      <Text
        style={{
          color: "white",
          fontSize: 15,
          fontWeight: "bold",
          marginLeft: 25,
          marginBottom: -15,
        }}
      >
        Email
      </Text>
      <View style={{ padding: 20 }}>
        <TextInput
          style={{
            height: 50,
            backgroundColor: "#101518",
            color: "white",
            borderRadius: 10,
            padding: 10,
          }}
        />
      </View>

      {/* Password Input */}
      <Text
        style={{
          color: "white",
          fontSize: 14,
          fontWeight: "bold",
          marginLeft: 25,
          marginBottom: -15,
        }}
      >
        Password
      </Text>
      <View style={{ padding: 20 }}>
        <TextInput
          style={{
            height: 50,
            backgroundColor: "#101518",
            color: "white",
            borderRadius: 10,
            padding: 10,
          }}
          placeholderTextColor="grey"
          secureTextEntry={true} // This line makes the input secure
        />
      </View>
      <View
        style={{
          padding: 7,
          backgroundColor: "#6898ab",
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 28,
          marginLeft: 32,
        }}
      >
        <Button
          title="Login"
          color={"white"}
          onPress={() => navigation.navigate("choosePlayer")}
        />
      </View>
      <View style={{ marginTop: 20, fontSize: 5, fontWeight: "bold" }}>
        <Button
          title="I don't remember my password"
          color={"white"}
          onPress={() => navigation.navigate("forgotpass")}
        ></Button>
      </View>
    </View>
  );
};

export default LoginCoach;

const styles = StyleSheet.create({});
