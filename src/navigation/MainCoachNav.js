import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChoosePlayer from "../screens/Coaches/ChoosePlayer";
import Playeredit from "../screens/Coaches/WorkoutEdit/Playeredit";
import CoachProfile from "../screens/Coaches/CoachProfile/CoachProfile";

const Tab = createBottomTabNavigator();
const MainCoachNav = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Athlete" component={ChoosePlayer} />
      <Tab.Screen name="Workout" component={Playeredit} />
      <Tab.Screen name="Profile" component={CoachProfile} />
    </Tab.Navigator>
  );
};

export default MainCoachNav;

const styles = StyleSheet.create({});
