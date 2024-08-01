import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fetchAllUsers } from "../../../api/UserApi/UserApi";
import { BASE_URL } from "../../../api";
import { Ionicons } from "@expo/vector-icons";

const ChatRoom = () => {
  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Chat With Your Athlete</Text>

        <ScrollView>
          {/* Modal */}

          {users?.map((user) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("chat", { userID: user._id });
              }}
              style={styles.userCard}
              key={user._id}
            >
              <Image
                style={styles.userImage}
                source={{ uri: `${BASE_URL}/${user.image}` }}
              />
              <Text style={styles.userName}>{user.fullname}</Text>
              <Ionicons name="chatbox" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#182026",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    marginBottom: 20,
  },
  userList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  userCard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    padding: 10,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  userName: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#6898ab",
    padding: 10,
    borderRadius: 28,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ChatRoom;
