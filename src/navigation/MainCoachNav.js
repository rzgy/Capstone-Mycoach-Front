import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChoosePlayer from "../screens/Coaches/ChoosePlayer";
import Playeredit from "../screens/Coaches/WorkoutEdit/Playeredit";
import CoachProfile from "../screens/Coaches/CoachProfile/CoachProfile";
import CoachStackNav from "./CoachNav/CoachStackNav";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { FontAwesome5 } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
const MainCoachNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackgroundColor: "#182026",
        tabBarActiveBackgroundColor: "#182026",
        tabBarActiveTintColor: "#6898ab",
        tabBarInactiveBackgroundColor: "#182026",
        tabBarStyle: { backgroundColor: "#182026", borderTopWidth: 0 },
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
        component={Playeredit}
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

export default MainCoachNav;

const styles = StyleSheet.create({});
