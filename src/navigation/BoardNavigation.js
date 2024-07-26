import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Board from "../screens/Board";
import LoginAthlete from "../screens/LoginAthlete";
import LoginCoach from "../screens/LoginCoach";

import CreateAccount from "../screens/Athletes/CreateAccount";
import ChoosePlan from "../screens/Athletes/ChoosePlan";
import OnBoardingSlide from "../screens/Athletes/OnBoardingSlide";
const stack = createStackNavigator();
const BoardNavigation = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
        initialRouteName: "board",
      }}
    >
      <stack.Screen name="board" component={Board} />

      <stack.Screen name="loginCoach" component={LoginCoach} />
      <stack.Screen name="loginAthlete" component={LoginAthlete} />
      <stack.Screen name="CreateAccount" component={CreateAccount} />
      <stack.Screen name="OnBoardingSlide" component={OnBoardingSlide} />
      <stack.Screen name="ChooseyourCoach" component={ChoosePlan} />
    </stack.Navigator>
  );
};

export default BoardNavigation;

const styles = StyleSheet.create({});
