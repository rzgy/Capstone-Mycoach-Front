import React, { useState, useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { BottomTabBar } from "@react-navigation/bottom-tabs";

const CustomTabBar = ({ handleScroll, ...props }) => {
  const [visible, setVisible] = useState(true);
  const [lastOffset, setLastOffset] = useState(0);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Initial animation
    Animated.timing(translateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    // Listen to scroll events from onScroll function
    const scrollListener = ({ nativeEvent }) => {
      const offsetY = nativeEvent.contentOffset.y;
      handleScroll(offsetY); // Pass offsetY to onScroll function
    };

    return () => {
      // Clean up the listener
    };
  }, [handleScroll]);

  const onScroll = (offsetY) => {
    if (offsetY > lastOffset && visible) {
      // Scrolling down
      Animated.timing(translateY, {
        toValue: 60, // Height of the tab bar
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    } else if (offsetY < lastOffset && !visible) {
      // Scrolling up
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(true));
    }
    setLastOffset(offsetY);
  };
  return (
    <Animated.View style={[styles.tabBar, { transform: [{ translateY }] }]}>
      <BottomTabBar {...props} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60, // Set to the height of your tab bar
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomTabBar;
