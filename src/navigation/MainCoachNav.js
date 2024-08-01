import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChoosePlayer from "../screens/Coaches/ChoosePlayer";

import CoachStackNav from "./CoachNav/CoachStackNav";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { FontAwesome5 } from "@expo/vector-icons";
import WorkoutStack from "./WorkoutStack";
import CustomTabBar from "../components/CustomTabBar";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "../screens/Coaches/CoachChat/Chat";
import CoachProfile from "../screens/Coaches/CoachProfile/CoachProfile";
import AboutUs from "../screens/Coaches/CoachProfile/AboutUs";
import Support from "../screens/Coaches/CoachProfile/Support";
import EditProfile from "../screens/Coaches/CoachProfile/EditProfile";
import ContactUs from "../screens/Coaches/CoachProfile/ContactUs";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
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

const ChatNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Go Back" component={MainCoachNav} />
      <Stack.Screen
        name="chat"
        options={{
          headerShown: true,
          title: "Chat",
        }}
        component={Chat}
      />
      <Stack.Screen name="coachProfile" component={CoachProfile} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="support" component={Support} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
    </Stack.Navigator>
  );
};
export { ChatNavigation };
export default MainCoachNav;

const styles = StyleSheet.create({});
