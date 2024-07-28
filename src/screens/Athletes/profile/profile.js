import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { removeToken } from "../../../api/storage";
import CoachContext from "../../../Context/CoachContext";
import UserContext from "../../../Context/UserContext";
import { fetchAllusers, fetchOneCoach } from "../../../api/CoachApi/CoachApi";
import { useQuery } from "@tanstack/react-query";
import { fetchOneUser } from "../../../api/UserApi/UserApi";

const Profile = () => {
  const [user, setUser] = useContext(UserContext);

  const navigation = useNavigation();
  handleAboutUs = () => {
    navigation.navigate("AboutUs");
  };
  const handleLogOut = () => {
    setUser(false);
    removeToken();
  };

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchOneUser,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {users && Array.isArray(users.usersList) ? (
            users.usersList.map((user, index) => (
              <Text key={index} style={styles.displayName}>
                {user.fullname}
              </Text>
            ))
          ) : (
            <Text style={styles.displayName}>
              users data is not available or not an array.
            </Text>
          )}
        </View>
        <View style={styles.menu}>
          <MenuItem
            icon="person-outline"
            text="Edit Profile"
            onPress={() => navigation.navigate("EditProfile")}
          />

          <MenuItem
            icon="information-circle-outline"
            text="About Us"
            onPress={handleAboutUs}
          />
          <MenuItem
            icon="help-circle-outline"
            text="Support Center"
            onPress={() => navigation.navigate("support")}
          />
          <MenuItem
            icon="call-outline"
            text="Contact Us"
            onPress={() => navigation.navigate("ContactUs")}
          />
          <MenuItem icon="share-social-outline" text="Share MyCoach App" />
          <MenuItem
            icon="exit-outline"
            text="Sign Out"
            onPress={handleLogOut}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const MenuItem = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#FFFFFF" />
    <Text style={styles.menuItemText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#182026",
  },
  container: {
    flex: 1,
    backgroundColor: "#182026",
  },
  header: {
    padding: 20,
    backgroundColor: "#182026",
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
    backgroundColor: "#182026",
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

export default Profile;
