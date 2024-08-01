import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import ToastManager, { Toast } from "toastify-react-native";
import { registerUser } from "../../api/auth";
import * as ImagePicker from "expo-image-picker";
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
    image: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["Register"],
    mutationFn: () => registerUser(userInfo),
    onSuccess: () => {
      Toast.success("Registration successful!");
      setIsLoading(false);
      navigation.navigate("loginAthlete");
    },
    onError: () => {
      Toast.error("Registration failed. Please try again.");
      setIsLoading(false);
    },
  });

  const handleFormSubmit = () => {
    setIsLoading(true);
    mutate();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserInfo((prev) => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  const handleChange = (name, value) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: "white" }}>{"<"}</Text>
        </TouchableOpacity>
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
            style={styles.passwordInput}
            value={userInfo.password}
            onChangeText={(value) => handleChange("password", value)}
            secureTextEntry={!showPassword}
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
          style={styles.input}
          textStyle={styles.dropdownText}
          dropdownTextStyle={styles.dropdownText}
          dropdownStyle={styles.dropdown}
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

        {/* Profile Picture Input */}
        <Text style={styles.inputLabel}>Profile Picture</Text>
        <TouchableOpacity onPress={pickImage}>
          {userInfo.image ? (
            <Image source={{ uri: userInfo.image }} style={styles.image} />
          ) : (
            <View style={styles.input}>
              <Text style={styles.chooseImageText}>Choose Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
          />
          <Text style={styles.checkboxLabel}>Accept Terms and Conditions</Text>
        </View>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleFormSubmit}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#182026",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 0,
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
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#101518",
    borderRadius: 10,
    marginBottom: 20,
  },
  passwordInput: {
    height: 45,
    backgroundColor: "#101518",
    color: "white",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 15,
    width: "100%",
  },
  eyeButton: {
    position: "absolute",
    right: 10,
    width: 30,
  },
  dropdownText: {
    color: "white",
  },
  dropdown: {
    backgroundColor: "#101518",
    borderRadius: 10,
    height: 80,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  chooseImageText: {
    color: "#276285",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    padding: 5,
    borderRadius: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  checkbox: {
    margin: 8,
  },
  checkboxLabel: {
    color: "white",
    fontWeight: "bold",
  },
  registerButton: {
    padding: 15,
    backgroundColor: "#6898ab",
    borderRadius: 28,
    alignItems: "center",
    marginTop: 50,
    marginBottom: 20,
  },
  registerButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default CreateAccount;
