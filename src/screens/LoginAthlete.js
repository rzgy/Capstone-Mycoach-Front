import { StyleSheet, Text, View } from "react-native";
import React from "react";
import OnBoardingSlide from "./Athletes/OnBoardingSlide";

const LoginAthlete = () => {
  return (
    <View style={{ flex: 1, padding: 50, backgroundColor: "#182026" }}>
      <OnBoardingSlide />
    </View>
  );
};

export default LoginAthlete;

const styles = StyleSheet.create({});
