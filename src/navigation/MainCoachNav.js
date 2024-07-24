import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChoosePlayer from "../screens/Coaches/ChoosePlayer";
import Playeredit from "../screens/Coaches/WorkoutEdit/Playeredit";
import CoachProfile from "../screens/Coaches/CoachProfile/CoachProfile";
import CoachStackNav from "./CoachNav/CoachStackNav";

const Tab = createBottomTabNavigator();
const MainCoachNav = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="choosePlayer" component={ChoosePlayer} />
      <Tab.Screen name="playeredit" component={Playeredit} />

      <Tab.Screen name="coachStack" component={CoachStackNav} />
    </Tab.Navigator>
  );
};

export default MainCoachNav;

const styles = StyleSheet.create({});
