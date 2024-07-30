import { StyleSheet, Text, View, Image, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";

const Board = () => {
  const Navigation = useNavigation();
  const handleGoToLoginCoach = () => {
    Navigation.navigate("loginCoach");
  };
  const handleGoToLoginAthlete = () => {
    Navigation.navigate("OnBoardingSlide");
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
            style={{ color: "#507BFF", fontSize: 32, fontFamily: "primary" }}
          >
            Coach
          </Text>
        </Text>
      </View>
      <View
        style={{
          marginTop: 110,
          width: "80%",
        }}
        accessibilityRole="button"
      >
        <LinearGradient
          colors={["#60C3FF", "#407BFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            alignItems: "center",
            padding: 10,
            borderRadius: 28,
          }}
        >
          <Button
            title="Athlete"
            color="white"
            width="100%"
            onPress={handleGoToLoginAthlete}
          />
        </LinearGradient>
      </View>
      <View
        style={{
          marginTop: 20,
          width: "80%",
        }}
        accessibilityRole="button"
      >
        <LinearGradient
          colors={["#60C3FF", "#407BFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ alignItems: "center", padding: 10, borderRadius: 28 }}
        >
          <Button
            title="Coach"
            color="white"
            onPress={handleGoToLoginCoach}
            width="100%"
          />
        </LinearGradient>
      </View>
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({});
