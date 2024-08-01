import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChoosePlayer from "../screens/Coaches/ChoosePlayer";

import CoachStackNav from "./CoachNav/CoachStackNav";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { FontAwesome5 } from "@expo/vector-icons";
import WorkoutStack from "./WorkoutStack";
import CustomTabBar from "../components/CustomTabBar";

const Tab = createBottomTabNavigator();
const MainCoachNav = () => {
  const [scrollHandler, setScrollHandler] = useState(null);
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <CustomTabBar {...props} setScrollHandler={setScrollHandler} />
      )}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        tabBarActiveTintColor: "#6898ab",

        tabBarStyle: {
          backgroundColor: "#101518",
          position: "absolute",
          borderTopWidth: 0,
          paddingTop: 27,
          elevation: 0,
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          marginLeft: "5%",

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

export default MainCoachNav;

const styles = StyleSheet.create({});
