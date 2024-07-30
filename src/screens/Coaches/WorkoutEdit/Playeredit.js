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
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import ModalDropdown from "react-native-modal-dropdown";

import { BASE_URL } from "../../../api";
import dayjs from "dayjs";
import {
  fetchAllUsers,
  fetchOneUser,
  fetchOneUserById,
} from "../../../api/UserApi/UserApi";
import DatePicker from "../../../components/DatePicker";

const Playeredit = () => {
  const route = useRoute();
  const _id = route.params?._id;

  const [startDate, setStartDate] = useState(new Date());

  const [exercises, setExercises] = useState([
    { id: 1, name: "", sets: "" },
    // Add more exercises as needed
  ]);

  const { data } = useQuery({
    queryKey: ["my Athletes", _id],
    queryFn: () => fetchAllUsers(),
    enabled: !_id,
  });

  const { data: player } = useQuery({
    queryKey: ["my Athletes", _id],
    queryFn: () => fetchOneUserById(_id),
    enabled: !!_id,
  });

  const [days, setDays] = useState([
    "Day 1",
    "Day 2",
    "Day 3",
    "Day 4",
    "Day 5",
    "Day 6",
    "Day 7",
  ]);
  const [editMode, setEditMode] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");
  const [newExerciseSets, setNewExerciseSets] = useState("");
  const [newDayName, setNewDayName] = useState("");
  const [numOfWeeks, setNumOfWeeks] = useState(12);
  const [selectedDay, setSelectedDay] = useState(false);
  const [ModaldropDown, setModaldropDown] = useState(
    `Week ${0 + 1}       ${dayjs(startDate)
      .add(1 * 0, "weeks")
      .format("DD MMM YYYY")}`
  );
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const addExercise = () => {
    if (selectedDay) {
      if (newExerciseName.trim() !== "" && newExerciseSets > 0) {
        const newExercise = {
          id: Math.random().toString(), // Generate a unique ID for the new exercise
          name: newExerciseName,
          sets: parseInt(newExerciseSets, 10),
        };
        setExercises({
          ...exercises,
          [selectedDay]: [...exercises[selectedDay], newExercise],
        });

        // TODO
        setNewExerciseName("");
        setNewExerciseSets("");
      } else {
        Alert.alert(
          "Don't do that MAN!",
          "Please enter a valid exercise name and sets."
        );
      }
    } else {
      Alert.alert(
        "Don't do that MAN!",
        "Please select a day to add exercise to it."
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

  const handlePressingDayWhenEdit = (index) => {
    if (editMode) {
      setSelectedDay(index);
    }
  };

  return (
    <LinearGradient
      colors={["#6898ab", "#407BFF"]}
      start={{ x: 0, y: 4 }}
      end={{ x: 1, y: 4 }}
      style={{ flex: 1, borderRadius: 25, overflow: "hidden" }}
    >
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.pageTitle}>Workout edit</Text>
        <ScrollView
          style={styles.container}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{
            paddingBottom: 70,
          }}
        >
          <LinearGradient
            colors={["white", "grey"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: 25, overflow: "hidden" }}
          >
            <View style={{ padding: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 20,
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri:
                      BASE_URL + "/" + (_id ? player?.image : data?.[0]?.image),
                  }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                  }}
                />
                <Text style={{ color: "black" }}>
                  {_id ? player?.fullname : data?.[0].fullname}
                </Text>

                <TouchableOpacity
                  style={[styles.editButton, { marginLeft: "auto" }]}
                  onPress={toggleEditMode}
                >
                  <Text style={styles.editButtonText}>
                    {editMode ? "Save" : "Edit"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>

          {Array.from({ length: 1 }, (_, i) => (
            <View key={`week-${i + 1}`} style={styles.weekContainer}>
              <View style={styles.weekHeader}>
                <Text style={styles.weekTitle}>Start date </Text>
                <DatePicker date={startDate} setDate={setStartDate} />
              </View>

              <View style={[styles.weekHeader, { marginTop: 10 }]}>
                <Text style={[styles.weekTitle]}>Num of weeks </Text>
                <TextInput
                  style={{
                    marginLeft: 10,
                    color: "white",
                    width: "48%",

                    borderColor: "white",
                    borderRadius: 10,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  placeholder="1 week, 2 weeks, etc."
                  placeholderTextColor={"grey"}
                  keyboardType="numeric"
                  onChangeText={(value) => setNumOfWeeks(value)}
                  value={numOfWeeks}
                />
              </View>

              <View style={styles.weekHeader}>
                <ModalDropdown
                  textStyle={{
                    color: "red",
                    fontWeight: "bold",
                    fontSize: 25,
                    textAlign: "center",
                  }}
                  style={[
                    styles.input,
                    {
                      paddingHorizontal: 12,
                      paddingTop: 15,
                      paddingBottom: 10,
                      height: 45,
                      justifyContent: "center",
                      flexDirection: "row",
                      alignItems: "center",
                    },
                  ]}
                  dropdownTextStyle={{
                    color: "white",

                    fontSize: 16,
                    backgroundColor: "101518",
                    height: 39,
                  }}
                  dropdownStyle={{
                    backgroundColor: "#101518",
                    borderRadius: 10,
                    height: 120,
                    width: "60%",
                    marginTop: 10,
                  }}
                  options={[...Array(+numOfWeeks || 12).keys()].map(
                    (_, i) =>
                      `Week ${i + 1}           ${dayjs(startDate)
                        .add(1 * i, "weeks")
                        .format("DD MMM YYYY")}`
                  )}
                  defaultValue={`started on ${dayjs(startDate).format(
                    "DD MMM YYYY"
                  )}`}
                  onSelect={(index, value) => {
                    setModaldropDown(value);
                    console.log(value);
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 25,
                      alignContent: "center",
                      textAlign: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: -10,
                      marginTop: -15,
                    }}
                  >
                    {ModaldropDown}
                  </Text>
                </ModalDropdown>
              </View>
              <View style={styles.dayContainer}>
                {days.map((day, index) => (
                  <TouchableOpacity
                    key={`day-${index + 1}`}
                    style={styles.day}
                    onPress={(index) => {
                      handlePressingDayWhenEdit(index);
                    }}
                  >
                    <Text style={styles.dayTitle}>{day}</Text>
                    <View style={styles.tableHeader}>
                      <Text style={styles.tableHeaderText}>Exercise name</Text>
                      <Text style={styles.tableHeaderText}>Sets needed</Text>
                      <Text style={styles.tableHeaderText}>Weight Played</Text>
                      <Text style={styles.tableHeaderText}>Reps played</Text>
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
                              <Text style={styles.deleteButtonText}>
                                Delete
                              </Text>
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
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>

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
                <TouchableOpacity
                  style={[styles.addButton, { marginBottom: 100 }]}
                  onPress={addExercise}
                >
                  <Text style={styles.addButtonText}>Add Exercise</Text>
                </TouchableOpacity>
              </View>
            </>
          </KeyboardAvoidingView>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  keyboardAvoidingView: {
    marginBottom: 45,
  },
  safeArea: {
    flex: 1,
    marginTop: -10,

    marginBottom: -28,
  },
  container: {
    flex: 1,
    backgroundColor: "#182026",
    padding: 20,
    marginBottom: -7,
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
    marginTop: 35,
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
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  addExerciseView: {
    flexDirection: "row",

    height: 110,
    marginBottom: 10,
  },
  addDayView: {
    flexDirection: "row",
    marginBottom: 50,
  },
  addInput: {
    marginTop: 15,
    marginHorizontal: 10,
    flex: 1,
    marginRight: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    height: 40,
    borderRadius: 5,
    color: "#FFFFFF",
  },
  addButton: {
    padding: 5,
    marginRight: 10,
    marginTop: 15,
    backgroundColor: "#101518",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
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
