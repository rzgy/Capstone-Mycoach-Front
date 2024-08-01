import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { FontAwesome5 } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import CoachStackNav from "../CoachNav/CoachStackNav";
import WorkoutPlan from "../../screens/Athletes/workouts/WorkoutPlan";
import AthleteStackNav from "./AthleteStackNav";
import WorkoutStackAthlete from "../WorkoutStackAthlete";
import ChatRoom from "../../screens/Coaches/CoachChat/ChatRoom";
import Chat from "../../screens/Coaches/CoachChat/Chat";
const Tab = createBottomTabNavigator();
const MainAthleteNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarActiveTintColor: "#6898ab",
        tabBarStyle: {
          backgroundColor: "#101518",
          position: "absolute",

          borderTopWidth: 0,

          bottom: 30,
          left: 20,
          right: 20,
          elevation: 0,
          height: "9%",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          padding: 25,
          borderRadius: 40,
        },
      }}
    >
      <Tab.Screen
        name="workoutStackAthlete"
        component={WorkoutStackAthlete}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome6
              name="dumbbell"
              size={24}
              color={focused ? color : "#FFFFFF"} // Use active tint color when focused, otherwise white
            />
          ),
        }}
      />

      <Tab.Screen
        name="Chat2"
        component={Chat}
        options={{
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name="chatbubbles"
              size={24}
              color={focused ? color : "#FFFFFF"}
            />
          ),
        }}
      />

      <Tab.Screen
        name="athleteStack"
        component={AthleteStackNav}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="user-edit"
              size={24}
              color={focused ? color : "#FFFFFF"} // Use active tint color when focused, otherwise white
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainAthleteNav;

const styles = StyleSheet.create({});
