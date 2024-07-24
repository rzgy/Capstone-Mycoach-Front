import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AboutUs from "../../screens/Coaches/CoachProfile/AboutUs";
import Support from "../../screens/Coaches/CoachProfile/Support";
import { createStackNavigator } from "@react-navigation/stack";
import CoachProfile from "../../screens/Coaches/CoachProfile/CoachProfile";
import EditProfile from "../../screens/Coaches/CoachProfile/EditProfile";
import ContactUs from "../../screens/Coaches/CoachProfile/ContactUs";

const CoachStackNav = () => {
  const stack = createStackNavigator();
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="coachProfile" component={CoachProfile} />
      <stack.Screen name="AboutUs" component={AboutUs} />
      <stack.Screen name="support" component={Support} />
      <stack.Screen name="EditProfile" component={EditProfile} />
      <stack.Screen name="ContactUs" component={ContactUs} />
    </stack.Navigator>
  );
};

export default CoachStackNav;

const styles = StyleSheet.create({});
