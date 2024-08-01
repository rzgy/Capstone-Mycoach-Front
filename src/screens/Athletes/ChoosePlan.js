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
import { fetchAllCoaches } from "../../api/CoachApi/CoachApi";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import SelectedCoachContext from "../../Context/SelectedCoachContext";

const ChoosePlan = () => {
  const [selectedCoach, setSelectedCoach] = useContext(SelectedCoachContext);
  const [showModal, setShowModal] = useState(false);
  const { data: coaches } = useQuery({
    queryKey: ["coaches"],
    queryFn: fetchAllCoaches,
  });

  const navigation = useNavigation();
  const handleGoToCreateAccount = () => {
    setShowModal(false);
    navigation.navigate("loginAthlete");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Choose your coach</Text>

        <ScrollView contentContainerStyle={styles.coachList}>
          {/* Modal */}
          <Modal visible={showModal} transparent={true}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Coach Plan</Text>
                <Text style={styles.modalText}>
                  Initial Consultation: $100{"\n"}
                  Weekly Coaching Sessions: $80{"\n"}
                  Monthly Package: $300 {"\n"}
                  for 4 sessions {"\n"}
                  Quarterly Package: $850 {"\n"}
                  for 12 sessions
                </Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => setShowModal(false)}
                  >
                    <Text style={styles.modalButtonText}>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={handleGoToCreateAccount}
                  >
                    <Text style={styles.modalButtonText}>Subscribe</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {coaches?.map((coach) => (
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
                setSelectedCoach(coach._id);
              }}
              style={styles.coachCard}
              key={coach._id}
            >
              <Image
                style={styles.coachImage}
                source={{ uri: `${BASE_URL}/${coach.image}` }}
              />
              <Text style={styles.coachName}>{coach.fullname}</Text>
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
  coachList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  coachCard: {
    width: "45%",
    alignItems: "center",
    marginBottom: 20,
  },
  coachImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  coachName: {
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

export default ChoosePlan;
