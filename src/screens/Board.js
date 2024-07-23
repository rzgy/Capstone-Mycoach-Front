import { StyleSheet, Text, View, Image, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Board = () => {
  const Navigation = useNavigation();
  const handleGoToLoginCoach = () => {
    Navigation.navigate("coachProfile");
  };
  const handleGoToLoginAthlete = () => {
    Navigation.navigate("loginAthlete");
  };
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
          alignItems: "center",
          justifyContent: "center",

          marginTop: 200,
          marginBottom: 20,
        }}
      >
        <Image
          source={require("../../assets/3.png")}
          style={{
            width: 200,
            height: 200,
            paddingBottom: 20,
            marginBottom: 30,
          }}
        />
        <Text
          style={{
            color: "white",
            fontSize: 32,

            fontWeight: "bold",
          }}
        >
          My
          <Text
            style={{ color: "#6898ab", fontSize: 32, fontFamily: "primary" }}
          >
            Coach
          </Text>
        </Text>
      </View>
      <View
        style={{
          marginTop: 110,
          backgroundColor: "#6898ab",
          padding: 10,
          borderRadius: 28,
          width: "80%",
          alignItems: "center",
        }}
        accessibilityRole="button"
      >
        <Button
          title="Athlete"
          color="white"
          width="100%"
          onPress={handleGoToLoginAthlete}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          backgroundColor: "#6898ab",
          padding: 10,
          borderRadius: 28,
          width: "80%",
          alignItems: "center",
        }}
        accessibilityRole="button"
      >
        <Button
          title="Coach"
          color="white"
          onPress={handleGoToLoginCoach}
          width="100%"
        />
      </View>
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({});
