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
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import ModalDropdown from "react-native-modal-dropdown";

import { BASE_URL } from "../../../api";
import dayjs from "dayjs";
import {
  fetchAllUsers,
  fetchOneUser,
  fetchOneUserById,
} from "../../../api/UserApi/UserApi";
import DatePicker from "../../../components/DatePicker";
import DayCard from "../../../components/DayCard";
import { removeToken } from "../../../api/storage";
import {
  createExercise,
  deleteExercise,
  getUserExercises,
  updateExercise,
} from "../../../api/ExercisesApi";
import SelectedPlayerContext from "../../../Context/SelectedPlayerContext";
import { colors } from "react-native-elements";

const WorkoutPlan = () => {
  const route = useRoute();

  useFocusEffect(useCallback(() => {}));
  const [startDate, setStartDate] = useState(new Date());
  const [selectedPlayer, setSelectedPlayer] = useContext(SelectedPlayerContext);
  const _id = selectedPlayer;

  const { data } = useQuery({
    queryKey: ["my Athletes", _id],
    queryFn: () => fetchAllUsers(),
    enabled: !_id,
  });

  const { data: player } = useQuery({
    queryKey: ["my Athletes", selectedPlayer],
    queryFn: () => fetchOneUserById(_id),
    enabled: !!_id,
  });
  console.log({ player });
  const [days, setDays] = useState([
    "Day 1",
    "Day 2",
    "Day 3",
    "Day 4",
    "Day 5",
    "Day 6",
    "Day 7",
  ]);

  const [exercises, setExercises] = useState({
    "Day 1": [],
    "Day 2": [],
    "Day 3": [],
    "Day 4": [],
    "Day 5": [],
    "Day 6": [],
    "Day 7": [],
  });

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
  const [weekSelected, setWeekSelected] = useState(1);
  const getExactDate = (startDate, selectedDay, weekSelected) => {
    const start = dayjs(startDate, "DD/MM/YYYY");

    const dayNumber = parseInt(selectedDay.replace("Day ", ""), 10);

    const baseDate = start.startOf("week").add(dayNumber, "day");

    const resultDate = baseDate.add(weekSelected, "week");

    return resultDate.format("MM/DD/YYYY");
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const { data: exer, refetch } = useQuery({
    queryKey: ["exercises--", _id ? player?._id : data?.[0]?._id],
    queryFn: () => getUserExercises(_id ? player?._id : data?.[0]?._id),
  });

  const { mutate } = useMutation({
    mutationFn: (info) => createExercise(_id || data?.[0]?._id, info),
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: mutateUpdate } = useMutation({
    mutationFn: (info) => updateExercise(info),
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: (id) => deleteExercise(id),
    onSuccess: () => {
      refetch();
    },
  });

  const getExer = () => {
    const weeklyExercises = {
      "Day 1": [],
      "Day 2": [],
      "Day 3": [],
      "Day 4": [],
      "Day 5": [],
      "Day 6": [],
      "Day 7": [],
    };

    const start = dayjs(dayjs(startDate).add(weekSelected, "week")).startOf(
      "week"
    ); // Get the start of the week

    exer?.forEach((exercise) => {
      const exerciseDate = dayjs(exercise.day).startOf("day"); // Normalize exercise date to just the day
      const daysDiff = exerciseDate.diff(start, "day"); // Difference in days from the start of the week

      if (daysDiff >= 0 && daysDiff < 7) {
        // Ensure the exercise date is within the current week
        const dayKey = `Day ${daysDiff}`;
        weeklyExercises[dayKey].push(exercise);
      }
    });

    setExercises(weeklyExercises);
  };

  useEffect(() => {
    getExer();
  }, [exer, weekSelected]);

  const addExercise = () => {
    if (selectedDay) {
      if (newExerciseName.trim() !== "" && newExerciseSets > 0) {
        const newExercise = {
          id: Math.random().toString(),
          name: newExerciseName,
          sets: parseInt(newExerciseSets, 10),
          day: getExactDate(startDate, selectedDay, weekSelected),
          link: "",
        };
        mutate(newExercise);
        setExercises((prevExercises) => ({
          ...prevExercises,
          [selectedDay]: [...prevExercises[selectedDay], newExercise],
        }));
        setNewExerciseName("");
        setNewExerciseSets("");
      } else {
        Alert.alert(
          "Invalid Input",
          "Please enter a valid exercise name and sets."
        );
      }
    } else {
      Alert.alert("No Day Selected", "Please select a day to add an exercise.");
    }
  };
  // TODO

  const addDay = () => {
    if (newDayName.trim() !== "") {
      setDays([...days, newDayName]);
      setNewDayName("");
    } else {
      Alert.alert("Invalid Input", "Please enter a valid day name.");
    }
  };

  const updateExercise_ = (exerciseId, name, sets) => {
    mutateUpdate({ id: exerciseId, name, sets });
  };

  const handlePressingDayWhenEdit = (index) => {
    if (editMode) {
      setSelectedDay(index);
    }
  };
  const scrollViewRef = useRef(null);

  const navigation = useNavigation();
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y; // Get current scroll position
  };

  return (
    <LinearGradient
      colors={["#6898ab", "#407BFF"]}
      start={{ x: 0, y: 4 }}
      end={{ x: 1, y: 4 }}
      style={{ flex: 1, borderRadius: 0, overflow: "hidden" }}
    >
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.pageTitle}>Workout edit</Text>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll} // Pass handleScroll function to ScrollView
          scrollEventThrottle={16}
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
                <DatePicker
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
                  date={startDate}
                  setDate={(s) => {
                    const weekStart = dayjs(s).startOf("week");
                    setStartDate(new Date(weekStart));
                    setWeekSelected(0);
                    getExer();
                    setModaldropDown(
                      `Week ${0 + 1}           ${dayjs(startDate)
                        .startOf("week")
                        .add(1 * 0, "weeks")
                        .format("DD MMM YYYY")}`
                    );
                  }}
                />
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
                  options={[...Array(+numOfWeeks || 12).keys()].map((_, i) => {
                    return `Week ${i + 1}           ${dayjs(startDate)
                      .startOf("week")
                      .add(1 * i, "weeks")
                      .format("DD MMM YYYY")}`;
                  })}
                  onSelect={(index, value) => {
                    setWeekSelected(index);
                    getExer();
                    setModaldropDown(value);
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
                  <DayCard
                    selectedDay={selectedDay}
                    editMode={editMode}
                    index={index}
                    styles={styles}
                    key={index}
                    day={day}
                    mutateUpdate={mutateUpdate}
                    exercises={exercises}
                    handlePressingDayWhenEdit={handlePressingDayWhenEdit}
                    mutateDelete={mutateDelete}
                  />
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
    marginBottom: 65,
  },
  safeArea: {
    flex: 1,
    marginBottom: -60,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#182026",
    padding: 20,
    marginBottom: -35,
    marginTop: -120,
    borderRadius: 0,
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
    marginTop: 50,
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
    marginTop: 50,
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

export default WorkoutPlan;
