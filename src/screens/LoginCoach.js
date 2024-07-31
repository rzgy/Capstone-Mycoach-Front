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
import UserContext from "../Context/CoachContext";
import { useMutation } from "@tanstack/react-query";
import ToastManager, { Toast } from "toastify-react-native";
import { loginCoach } from "../api/auth";
import CoachContext from "../Context/CoachContext";
import { LinearGradient } from "expo-linear-gradient";

// ..
const LoginCoach = () => {
  const navigation = useNavigation();

  const [coachInfo, setCoachInfo] = useState({
    email: "",
    password: "",
  });

  const [coach, setCoach] = useContext(CoachContext);

  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = useMutation({
    mutationKey: ["Login"],
    mutationFn: () => loginCoach(coachInfo),
    onSuccess: () => {
      setCoach(true);

      Toast.success("Login successful!");
      setIsLoading(false);
    },
    onError: (e) => {
      Toast.error("Login failed. Please check your credentials.");
      setIsLoading(false);
    },
  });

  const handleChange = (name, value) => {
    setCoachInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = () => {
    setIsLoading(true);
    mutate();
  };

  if (coach) {
    return navigation.navigate("choosePlayer");
  }

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
        value={coachInfo.email}
        onChangeText={(value) => handleChange("email", value)}
        keyboardType="email-address"
        placeholderTextColor="grey"
      />
      {/* Password Input */}
      <Text style={styles.inputLabel}>Password</Text>
      <TextInput
        style={styles.input}
        value={coachInfo.password}
        onChangeText={(value) => handleChange("password", value)}
        secureTextEntry={true}
        placeholderTextColor="grey"
      />

      <TouchableOpacity
        title="Login"
        color="white"
        onPress={handleFormSubmit}
        width="100%"
      >
        <LinearGradient
          colors={["#60C3FF", "#407BFF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            alignItems: "center",
            padding: 12,
            borderRadius: 28,
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={() => navigation.navigate("contactUs")}
      >
        <Text style={{ color: "white", fontSize: 12 }}>
          you want to be a Coach? contact us
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

export default LoginCoach;
