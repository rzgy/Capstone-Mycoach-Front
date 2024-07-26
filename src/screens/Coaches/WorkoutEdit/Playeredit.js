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

const ExerciseSchedule = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            /* Navigation logic here */
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>Page Title</Text>

        {Array.from({ length: 4 }, (_, i) => (
          <View key={`week-${i + 1}`} style={styles.weekContainer}>
            <View style={styles.weekHeader}>
              <Text style={styles.weekTitle}>Week {i + 1}</Text>
              <Text style={styles.weekSubtitle}>started on 15/7/2024</Text>
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.dayContainer}>
              {["Day 1", "Day 2"].map((day, index) => (
                <View key={`day-${index + 1}`} style={styles.day}>
                  <Text style={styles.dayTitle}>{day}</Text>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Exercise name</Text>
                    <Text style={styles.tableHeaderText}>sets</Text>
                    <Text style={styles.tableHeaderText}>weight</Text>
                    <Text style={styles.tableHeaderText}>Sets played?</Text>
                  </View>
                  {Array.from({ length: 5 }, (_, j) => (
                    <View key={`exercise-${j + 1}`} style={styles.tableRow}>
                      <Text style={styles.tableRowText}>PullUp</Text>
                      <Text style={styles.tableRowText}>3</Text>
                      <Text style={styles.tableRowText}>....</Text>
                      <Text style={styles.tableRowText}>....</Text>
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  weekContainer: {
    marginBottom: 30,
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
  },
  weekTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  weekSubtitle: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  dayContainer: {
    marginTop: 20,
  },
  day: {
    marginBottom: 20,
  },
  dayTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1e1e1e",
    padding: 10,
    borderRadius: 5,
  },
  tableHeaderText: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#2e2e2e",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  tableRowText: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
  },
});

export default ExerciseSchedule;
