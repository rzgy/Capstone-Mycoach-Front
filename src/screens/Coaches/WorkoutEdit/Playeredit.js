import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const Playeredit = () => {
  const [exercises, setExercises] = useState([
    { id: 1, name: "", sets: "" },
    // Add more exercises as needed
  ]);
  const [days, setDays] = useState(["Day 1"]);
  const [editMode, setEditMode] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");
  const [newExerciseSets, setNewExerciseSets] = useState("");
  const [newDayName, setNewDayName] = useState("");

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const addExercise = () => {
    if (newExerciseName.trim() !== "" && newExerciseSets > 0) {
      const newExercise = {
        id: Math.random().toString(), // Generate a unique ID for the new exercise
        name: newExerciseName,
        sets: parseInt(newExerciseSets, 10),
      };
      setExercises([...exercises, newExercise]);
      setNewExerciseName("");
      setNewExerciseSets("");
    } else {
      Alert.alert(
        "Don't do that MAN!",
        "Please enter a valid exercise name and sets."
      );
    }
  };

  const addDay = () => {
    if (newDayName.trim() !== "") {
      setDays([...days, newDayName]);
      setNewDayName("");
    } else {
      Alert.alert("Invalid Input", "Please enter a valid day name.");
    }
  };

  const updateExercise = (id, field, value) => {
    setExercises(
      exercises.map((exercise) =>
        exercise.id === id ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const deleteExercise = (id) => {
    setExercises(exercises.filter((exercise) => exercise.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.pageTitle}>Workout edit</Text>
      <ScrollView style={styles.container}>
        {Array.from({ length: 1 }, (_, i) => (
          <View key={`week-${i + 1}`} style={styles.weekContainer}>
            <View style={styles.weekHeader}>
              <Text style={styles.weekTitle}>Week {1}</Text>
              <Text style={styles.weekSubtitle}>started on 15/7/2024</Text>
              <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.dayContainer}>
              {days.map((day, index) => (
                <View key={`day-${index + 1}`} style={styles.day}>
                  <Text style={styles.dayTitle}>{day}</Text>
                  <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Exercise name</Text>
                    <Text style={styles.tableHeaderText}>Sets needed</Text>
                    {/* Additional headers */}
                  </View>
                  {exercises.map((exercise) => (
                    <View key={exercise.id} style={styles.tableRow}>
                      {editMode ? (
                        <>
                          <TextInput
                            style={styles.tableRowText}
                            value={exercise.name}
                            onChangeText={(value) =>
                              updateExercise(exercise.id, "name", value)
                            }
                          />
                          <TextInput
                            style={styles.tableRowText}
                            value={`${exercise.sets}`}
                            keyboardType="numeric"
                            onChangeText={(value) =>
                              updateExercise(
                                exercise.id,
                                "sets",
                                parseInt(value, 10)
                              )
                            }
                          />

                          {/* Additional input fields */}
                          <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => deleteExercise(exercise.id)}
                          >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                          </TouchableOpacity>
                        </>
                      ) : (
                        <>
                          <Text style={styles.tableRowText}>
                            {exercise.name}
                          </Text>
                          <Text style={styles.tableRowText}>
                            {exercise.sets}
                          </Text>
                          {/* Additional text fields */}
                        </>
                      )}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
        <Text style={styles.editButtonText}>{editMode ? "Save" : "Edit"}</Text>
      </TouchableOpacity>
      {editMode && (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <>
            <View style={styles.addExerciseView}>
              <TextInput
                style={styles.addInput}
                placeholder="Exercise name"
                placeholderTextColor={"black"}
                value={newExerciseName}
                onChangeText={setNewExerciseName}
              />
              <TextInput
                style={styles.addInput}
                placeholder="Sets"
                placeholderTextColor={"black"}
                keyboardType="numeric"
                value={newExerciseSets}
                onChangeText={setNewExerciseSets}
              />
              <TouchableOpacity style={styles.addButton} onPress={addExercise}>
                <Text style={styles.addButtonText}>Add Exercise</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.addDayView}>
              <TextInput
                style={styles.addInput}
                placeholder="Day name"
                placeholderTextColor={"black"}
                value={newDayName}
                onChangeText={setNewDayName}
              />
              <TouchableOpacity style={styles.addButton} onPress={addDay}>
                <Text style={styles.addButtonText}>Add Day</Text>
              </TouchableOpacity>
            </View>
          </>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    marginBottom: 45,
  },
  safeArea: {
    flex: 1,
    marginTop: -10,
    backgroundColor: "#6898ab",
    marginBottom: -10,
  },
  container: {
    flex: 1,
    backgroundColor: "#182026",
    padding: 20,
    marginBottom: -30,
    marginTop: -5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,

    overflow: "hidden",
  },
  backButton: {
    marginBottom: 20,
  },
  pageTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },
  weekContainer: {
    marginBottom: 50,
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#101518",
    padding: 15,
    borderRadius: 10,
    marginTop: 45,
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
    backgroundColor: "#6898ab",
    padding: 10,
    borderRadius: 5,
  },
  tableHeaderText: {
    color: "#FFFFFF",
    fontSize: 16,
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#101518",
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
  editButton: {
    position: "absolute",
    bottom: 700,
    right: 20,
    backgroundColor: "#6898ab",
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  addExerciseView: {
    flexDirection: "row",
    backgroundColor: "#6898ab",
    marginBottom: 10,
  },
  addDayView: {
    flexDirection: "row",
    marginBottom: 50,
  },
  addInput: {
    marginTop: 10,
    marginHorizontal: 10,
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",

    borderRadius: 5,
    color: "#FFFFFF",
  },
  addButton: {
    padding: 5,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: "#101518",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",

    width: 150,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteButton: {
    marginLeft: 10,
  },
  deleteButtonText: {
    color: "grey",
    fontSize: 16,
  },
});

export default Playeredit;
