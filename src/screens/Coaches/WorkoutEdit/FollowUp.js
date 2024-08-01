import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigation } from "@react-navigation/native";
import { fetchOneUserById, fetchAllUsers } from "../../../api/UserApi/UserApi";
// import { addDailyWeight, fetchDailyWeights } from "../../../api/WeightApi";

const FollowUp = () => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const navigation = useNavigation();

  const { data: playerData } = useQuery({
    queryKey: ["myAthletes", selectedPlayer],
    queryFn: () => fetchOneUserById(selectedPlayer),
    enabled: !!selectedPlayer,
  });

  const { data: allUsersData } = useQuery({
    queryKey: ["myAthletes"],
    queryFn: fetchAllUsers,
    enabled: !selectedPlayer,
  });

  const player = selectedPlayer ? playerData : allUsersData?.[0];

  const [weight, setWeight] = useState("");
  const [dailyWeights, setDailyWeights] = useState([]);

  const { data: fetchedWeights, refetch } = useQuery({
    queryKey: ["dailyWeights", player?._id],
    queryFn: () => fetchDailyWeights(player?._id),
    enabled: !!player,
  });

  useEffect(() => {
    if (fetchedWeights) {
      setDailyWeights(fetchedWeights);
    }
  }, [fetchedWeights]);

  const { mutate: saveDailyWeight } = useMutation({
    mutationFn: (info) => addDailyWeight(player?._id, info),
    onSuccess: () => {
      Alert.alert("Success", "Daily weight added successfully.");
      refetch();
    },
    onError: () => {
      Alert.alert("Error", "Failed to add daily weight.");
    },
  });

  const handleSave = () => {
    if (weight.trim() !== "") {
      saveDailyWeight({ weight, date: new Date().toISOString() });
      setWeight("");
    } else {
      Alert.alert("Invalid Input", "Please enter a valid weight.");
    }
  };

  return (
    <LinearGradient
      colors={["#6898ab", "#407BFF"]}
      start={{ x: 0, y: 4 }}
      end={{ x: 1, y: 4 }}
      style={{ flex: 1, borderRadius: 0, overflow: "hidden" }}
    >
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.pageTitle}>Daily Weight Follow-Up</Text>
        <View style={styles.container}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter weight"
            placeholderTextColor="grey"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <FlatList
            data={dailyWeights}
            keyExtractor={(item) => item.date}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text style={styles.listItemText}>
                  {new Date(item.date).toLocaleDateString()} - {item.weight} kg
                </Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#101518",
    color: "#FFFFFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#101518",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    backgroundColor: "#101518",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  listItemText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default FollowUp;
