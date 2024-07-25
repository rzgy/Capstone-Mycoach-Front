import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import UserContext from "../../Context/UserContext";
import { useMutation } from "@tanstack/react-query";
import ToastManager, { Toast } from "toastify-react-native";
import { registerUser } from "../../api/auth";
import { ScrollView } from "react-native-gesture-handler";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";
import ModalDropdown from "react-native-modal-dropdown";
const CreateAccount = () => {
  const navigation = useNavigation();

  const [userInfo, setUserInfo] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "",
    height: "",
    age: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["Register"],
    mutationFn: () => registerUser(userInfo),
    onSuccess: () => {
      Toast.success("Registration successful!");
      setIsLoading(false);
      navigation.navigate("LoginAthlete");
    },
    onError: (e) => {
      console.log(e);
      Toast.error("Registration failed. Please try again.");
      setIsLoading(false);
    },
  });

  const handleChange = (name, value) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = () => {
    setIsLoading(true);
    console.log(userInfo);
    mutate();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "white" }}>{"<"}</Text>
      </TouchableOpacity>
      <ScrollView
        showsVerticalScrollIndicator={false} // Hide the vertical scroll indicator
        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
      >
        <ToastManager />

        <Text style={styles.title}>Register</Text>
        {/* Fullname Input */}
        <Text style={styles.inputLabel}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={userInfo.fullname}
          onChangeText={(value) => handleChange("fullname", value)}
          placeholderTextColor="grey"
        />
        {/* Email Input */}
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          value={userInfo.email}
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
          placeholderTextColor="grey"
        />
        {/* Password Input */}
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={{
              height: 45,
              backgroundColor: "#101518",
              color: "white",
              borderRadius: 10,
              padding: 10,
              paddingLeft: 15,

              width: "100%",
            }}
            value={userInfo.password}
            onChangeText={(value) => handleChange("password", value)}
            secureTextEntry={!showPassword} // Use the showPassword state to control visibility
            placeholderTextColor="grey"
          />

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={togglePasswordVisibility}
          >
            <Feather
              name={showPassword ? "eye-off" : "eye"}
              size={21}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {/* Gender Dropdown */}
        <Text style={styles.inputLabel}>Gender</Text>
        <ModalDropdown
          style={[
            styles.input,
            {
              paddingHorizontal: 12,
              paddingTop: 15,
              paddingBottom: 10,
              height: 45,
            },
          ]}
          textStyle={{ color: "white", backgroundColor: "101518" }}
          dropdownTextStyle={{
            color: "white",
            fontSize: 16,
            backgroundColor: "101518",
            height: 39,
          }}
          dropdownStyle={{
            backgroundColor: "#101518",
            borderRadius: 10,
            height: 80,
          }}
          options={["Male", "Female"]}
          defaultValue={userInfo.gender}
          onSelect={(index, value) => handleChange("gender", value)}
        />

        {/* Height Input */}
        <Text style={styles.inputLabel}>Height cm</Text>
        <TextInput
          style={styles.input}
          value={userInfo.height}
          onChangeText={(value) => handleChange("height", value)}
          keyboardType="numeric"
          placeholderTextColor="grey"
        />
        {/* Age Input */}
        <Text style={styles.inputLabel}>Age</Text>
        <TextInput
          style={styles.input}
          value={userInfo.age}
          onChangeText={(value) => handleChange("age", value)}
          keyboardType="numeric"
          placeholderTextColor="grey"
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleFormSubmit}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101518",
    borderRadius: 10,

    marginBottom: 20,
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    width: 30,
  },

  container: {
    flex: 1,
    backgroundColor: "#182026",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#101518",
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 150,
    marginBottom: 20,
  },
  inputLabel: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    height: 45,
    backgroundColor: "#101518",
    color: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  registerButton: {
    padding: 15,
    backgroundColor: "#6898ab",
    borderRadius: 28,
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default CreateAccount;
