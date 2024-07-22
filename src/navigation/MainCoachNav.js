import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChoosePlayer from "../screens/Coaches/ChoosePlayer";
import Playeredit from "../screens/Coaches/WorkoutEdit/Playeredit";
import CoachProfile from "../screens/Coaches/CoachProfile/CoachProfile";

const MainCoachNav = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="choosePlayer" component={ChoosePlayer} />
      <Tab.Screen name="playerEdit" component={Playeredit} />
      <Tab.Screen name="coachProfile" component={CoachProfile} />
    </Tab.Navigator>
  );
}

export default MainCoachNav;

const styles = StyleSheet.create({});
