import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Playeredit from "../screens/Coaches/WorkoutEdit/Playeredit";
import FollowUp from "../screens/Coaches/WorkoutEdit/FollowUp";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
const Tab = createMaterialTopTabNavigator();
const WorkoutStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: "#6898ab",
      }}
    >
      <Tab.Screen
        name="Playeredit"
        component={Playeredit}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome6
              name="dumbbell"
              size={24}
              color={focused ? color : "#FFFFFF"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FollowUp"
        component={FollowUp}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome6
              name="weight-scale"
              size={24}
              color={focused ? color : "#FFFFFF"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default WorkoutStack;

const styles = StyleSheet.create({});
