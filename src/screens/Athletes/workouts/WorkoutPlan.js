import { StyleSheet, Text, View } from "react-native";
import React from "react";

const WorkoutPlan = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#182026",
      }}
    >
      <Text style={{ color: "white", fontSize: 32, fontWeight: "bold" }}>
        excersises
      </Text>
    </View>
  );
};

export default WorkoutPlan;

const styles = StyleSheet.create({});
