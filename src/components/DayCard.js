import React, { useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const DayCard = ({
  selectedDay,
  editMode,
  styles,
  handlePressingDayWhenEdit,
  exercises,
  index,
  day,
  mutateUpdate,
  mutateDelete,
}) => {
  const [info, setInfo] = useState({}); // Store info for the currently edited exercise

  const handleBlur = (id) => {
    if (info._id === id) {
      // Trigger the update when the input loses focus

      mutateUpdate({ id: info._id, name: info.name, sets: info.sets });
      setInfo({});
    }
  };

  const openLink = async (link) => {
    try {
      const url = link;
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
      }
    } catch (error) {}
  };

  return (
    <TouchableOpacity
      key={`day-${index + 1}`}
      style={[
        styles.day,
        {
          borderWidth: 2,
          borderColor:
            editMode && selectedDay === day ? "green" : "transparent",
        },
      ]}
      onPress={() => handlePressingDayWhenEdit(day)}
    >
      <Text style={styles.dayTitle}>{day}</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Exercise name</Text>
        <Text style={styles.tableHeaderText}>Sets needed</Text>
        <Text style={styles.tableHeaderText}>Weight played</Text>
        <Text style={styles.tableHeaderText}>Reps played</Text>
        {/* Additional headers */}
      </View>
      {exercises[day]?.map((exercise) => (
        <View key={exercise._id} style={styles.tableRow}>
          {editMode ? (
            <>
              <TextInput
                style={styles.tableRowText}
                value={
                  info._id === exercise._id
                    ? !info.name && info.name != ""
                      ? exercise.name
                      : info.name
                    : exercise.name
                }
                onFocus={() =>
                  setInfo({ _id: exercise._id, name: exercise.name })
                }
                onChangeText={(value) =>
                  setInfo((prev) => ({ ...prev, name: value }))
                }
                onBlur={() => handleBlur(exercise._id)}
              />

              <TextInput
                style={styles.tableRowText}
                keyboardType="numeric"
                value={
                  info._id === exercise._id
                    ? !info.sets && info.sets != ""
                      ? `${exercise.sets}`
                      : info.sets
                    : `${exercise.sets}`
                }
                onFocus={() =>
                  setInfo({ _id: exercise._id, sets: exercise.sets })
                }
                onChangeText={(value) =>
                  setInfo((prev) => ({ ...prev, sets: value }))
                }
                onBlur={() => handleBlur(exercise._id)}
              />
              <Text style={styles.tableRowText}>""</Text>
              <Text style={styles.tableRowText}>""</Text>
              {/* Additional input fields */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => mutateDelete(exercise._id)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              {exercise.link ? (
                <TouchableOpacity onPress={() => openLink(exercise.link)}>
                  <Text style={styles.tableRowText}> {exercise.name} </Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.tableRowText}> {exercise.name} </Text>
              )}

              <Text style={styles.tableRowText}>{exercise.sets}</Text>
              <Text style={styles.tableRowText}>""</Text>
              <Text style={styles.tableRowText}>""</Text>
              {/* Additional text fields */}
            </>
          )}
        </View>
      ))}
    </TouchableOpacity>
  );
};

export default DayCard;

const styles = StyleSheet.create({
  // Your styles here
});
