import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "react-native-elements";
import { BASE_URL } from "../../api";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { fetchAllUsers } from "../../api/UserApi/UserApi";
import SelectedPlayerContext from "../../Context/SelectedPlayerContext";

const ChoosePlayer = () => {
  const [selectedPlayer, setSelectedPlayer] = useContext(SelectedPlayerContext);

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
        <Text style={styles.title}>Choose your Athlete</Text>

        <ScrollView contentContainerStyle={styles.userList}>
          {/* Modal */}

          {users?.map((user) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedPlayer(user._id);
                navigation.navigate("playeredit", { _id: user._id });
              }}
              style={styles.userCard}
              key={user._id}
            >
              <Image
                style={styles.userImage}
                source={{ uri: `${BASE_URL}/${user.image}` }}
              />
              <Text style={styles.userName}>{user.fullname}</Text>
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
    width: "45%",
    alignItems: "center",
    marginBottom: 20,
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

export default ChoosePlayer;
