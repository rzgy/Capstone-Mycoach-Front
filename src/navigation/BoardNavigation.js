import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Board from "../screens/Board";
import LoginAthlete from "../screens/LoginAthlete";
import LoginCoach from "../screens/LoginCoach";
import register from "../screens/register";
import ChoosePlayer from "../screens/Coaches/ChoosePlayer";
import CoachProfile from "../screens/Coaches/CoachProfile/CoachProfile";
import Support from "../screens/Coaches/CoachProfile/Support";
import AboutUs from "../screens/Coaches/CoachProfile/AboutUs";

const stack = createStackNavigator();
const BoardNavigation = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        initialRouteName: "AboutUs",
      }}
    >
      <stack.Screen name="AboutUs" component={AboutUs} />
      <stack.Screen name="support" component={Support} />
      <stack.Screen name="board" component={Board} />
      <stack.Screen name="loginCoach" component={LoginCoach} />
      <stack.Screen name="loginAthlete" component={LoginAthlete} />
      <stack.Screen name="choosePlayer" component={ChoosePlayer} />
      <stack.Screen name="coachProfile" component={CoachProfile} />
    </stack.Navigator>
  );
};

export default BoardNavigation;

const styles = StyleSheet.create({});
