import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChoosePlayer from "../screens/Coaches/ChoosePlayer";
import Playeredit from "../screens/Coaches/WorkoutEdit/Playeredit";
import CoachStackNav from "./CoachNav/CoachStackNav";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { FontAwesome5 } from "@expo/vector-icons";
import WorkoutStack from "./WorkoutStack";

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
        name="choosePlayer"
        component={ChoosePlayer}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <FontAwesome5
              name="users"
              size={24}
              color={focused ? color : "#FFFFFF"} // Use active tint color when focused, otherwise white
            />
          ),
        }}
      />
      <Tab.Screen
        name="playeredit"
        component={WorkoutStack}
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
        name="coachStack"
        component={CoachStackNav}
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
