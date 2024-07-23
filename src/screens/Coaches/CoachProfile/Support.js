import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Support = () => {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    {
      question: "What is the purpose of the My Couch?",
      answer:
        "The My Couch App is designed to connect coaches and trainers with individuals looking for professional guidance. Whether you are a coach offering your services or someone seeking expert training, our app provides a platform to facilitate these connections efficiently.",
    },
    {
      question: "How can I find a coach using the App?",
      answer:
        "Simply create an account and use the search feature to find coaches or trainers based on your specific needs, such as sports, fitness goals, or training styles. You can view profiles, read reviews, and directly contact coaches or trainers to discuss your requirements.",
    },
    {
      question:
        "What features does the My Couch App offer for coaches and trainers?",
      answer:
        " Coaches and trainers can create detailed profiles, list their services, set their availability, and manage bookings. The app also includes tools for communicating with clients, tracking training progress, and receiving payments securely.",
    },
    {
      question: "Is there a rating in the My Couch App?",
      answer:
        "Yes, our app includes a rating and review system where clients can provide feedback on their experiences with coaches and trainers. This helps maintain a high standard of service and allows new users to make informed decisions based on past reviews.",
    },
  ];

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
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
        <Text style={styles.title}>Support Center</Text>
        {faqs.map((faq, index) => (
          <View key={index} style={styles.faqContainer}>
            <TouchableOpacity
              style={styles.questionContainer}
              onPress={() => toggleExpand(index)}
            >
              <Ionicons
                name={expanded === index ? "remove" : "add"}
                size={24}
                color="#FFFFFF"
              />
              <Text style={styles.question}>{faq.question}</Text>
            </TouchableOpacity>
            {expanded === index && (
              <Text style={styles.answer}>{faq.answer}</Text>
            )}
          </View>
        ))}
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
  faqContainer: {
    marginBottom: 20,
    backgroundColor: "#1c262e",
    borderRadius: 10,
    padding: 15,
  },
  questionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  question: {
    color: "#FFFFFF",
    fontSize: 18,
    marginLeft: 10,
  },
  answer: {
    color: "#AAAAAA",
    fontSize: 16,
    marginTop: 10,
    paddingLeft: 34,
  },
});

export default Support;
