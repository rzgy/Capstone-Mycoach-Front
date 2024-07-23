import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const CoachProfile = () => {
  const returnProfileGreeting = (name) => `Welcome back, ${name}!`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>
            {returnProfileGreeting("Soud alenezi")}
          </Text>
          <Text style={styles.displayName}>Soud alenezi</Text>
          <View style={styles.messageBox}>
            <Text style={styles.messageText}>Thank you for supporting us!</Text>
            <Text style={styles.messageSubText}>
              As a local business, we thank you for supporting us and hope you
              enjoy.
            </Text>
          </View>
        </View>

        <View style={styles.menu}>
          <MenuItem icon="person-outline" text="Edit Profile" />
          <MenuItem icon="restaurant-outline" text="Eating Preferences" />
          <MenuItem icon="information-circle-outline" text="About Us" />
          <MenuItem icon="help-circle-outline" text="Support Center" />
          <MenuItem icon="call-outline" text="Contact Us" />
          <MenuItem icon="share-social-outline" text="Share MealPlanner App" />
          <MenuItem icon="exit-outline" text="Sign Out" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ icon, text }) => (
  <TouchableOpacity style={styles.menuItem}>
    <Ionicons name={icon} size={24} color="#FFFFFF" />
    <Text style={styles.menuItemText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    padding: 20,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
  },
  greeting: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 5,
  },
  displayName: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  messageBox: {
    backgroundColor: "#4A90E2",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  messageText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  messageSubText: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
    marginTop: 5,
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
  },
  menuItemText: {
    color: "#FFFFFF",
    fontSize: 18,
    marginLeft: 15,
  },
});

export default CoachProfile;
