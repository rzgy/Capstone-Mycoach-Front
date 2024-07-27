import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { getHeaderTitle } from "@react-navigation/elements";

import { useMutation } from "@tanstack/react-query";
import ToastManager, { Toast } from "toastify-react-native";
import { loginUser } from "../api/auth";
import UserContext from "../Context/UserContext";

// ..
const LoginAthlete = () => {
  const navigation = useNavigation();
  const [user, setUser] = useContext(UserContext);

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["Login"],
    mutationFn: () => loginUser(userInfo),
    onSuccess: (data) => {
      setUser(true);

      Toast.success("Login successful!");
      setIsLoading(false);
    },
    onError: (e) => {
      console.log(e);
      Toast.error("Login failed. Please check your credentials.");
      setIsLoading(false);
    },
  });

  const handleChange = (name, value) => {
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };
  const handleFormSubmit = () => {
    setIsLoading(true);
    mutate();
  };

  return (
    <View style={styles.container}>
      <ToastManager />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: "white" }}>{"<"}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Login</Text>
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
      <TextInput
        style={styles.input}
        value={userInfo.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry={true}
        placeholderTextColor="grey"
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleFormSubmit}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        <Text style={{ color: "white", fontSize: 12 }}>
          You don't have an account? Register here
        </Text>
      </TouchableOpacity>
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
    height: 50,
    backgroundColor: "#101518",
    color: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  loginButton: {
    padding: 15,
    backgroundColor: "#6898ab",
    borderRadius: 28,
    alignItems: "center",
    marginBottom: 20,
  },
  forgotPasswordButton: {
    alignItems: "center",
  },
});

export default LoginAthlete;
