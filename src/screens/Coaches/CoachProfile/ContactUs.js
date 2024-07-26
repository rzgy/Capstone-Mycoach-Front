import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const ContactUs = () => {
  const openLink = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

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
        <Text style={styles.title}>Contact Us</Text>

        <Text style={styles.label}>WhatsApp</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => openLink("https://wa.me/0096599239504")}
        >
          <Text style={styles.buttonText}>Chat on WhatsApp</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Instagram</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            openLink(
              "https://www.instagram.com/mycoach.kw?igsh=OWcyNzBnanhqcW9y&utm_source=qr"
            )
          }
        >
          <Text style={styles.buttonText}>Follow on Instagram</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Technical Support</Text>
        <Text style={styles.description}>You can reach us at:</Text>
        <Text style={styles.supportNumber}>+1 (800) 123-4567</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#182026",
  },
  container: {
    flex: 1,
    backgroundColor: "#182026",
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: "#AAAAAA",
    fontSize: 14,
    marginBottom: 10,
  },
  supportNumber: {
    color: "#FFFFFF",
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ContactUs;
