import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Playeredit from "../screens/Coaches/WorkoutEdit/Playeredit";
import FollowUp from "../screens/Coaches/WorkoutEdit/FollowUp";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import WorkoutPlan from "../screens/Athletes/workouts/WorkoutPlan";
const Tab = createMaterialTopTabNavigator();
const WorkoutStackAthlete = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: false,
        tabBarActiveTintColor: "#6898ab",
        flex: 1,
        justifyContent: "center",

        flexDirection: "space-around",

        tabBarIndicatorStyle: {
          backgroundColor: "#6898ab",
          height: 3,
        },

        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "bold",

          textTransform: "none",
        },

        tabBarStyle: {
          padding: 1,

          backgroundColor: "white",
          justifyContent: "center",

          marginTop: 30,
        },
      }}
    >
      <Tab.Screen
        name="WorkoutPlan"
        component={WorkoutPlan}
        options={{ width: 200 }}
      />
      <Tab.Screen
        name="FollowUp"
        component={FollowUp}
        options={{ width: 200 }}
      />
    </Tab.Navigator>
  );
};

export default WorkoutStackAthlete;

const styles = StyleSheet.create({});
