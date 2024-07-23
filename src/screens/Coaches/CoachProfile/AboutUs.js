import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AboutUs = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>About Us</Text>
        </View>
        <View style={styles.content}>
          <Image
            source={(require = "../../assets/3.png")}
            style={{
              width: 200,
              height: 200,
              paddingBottom: 20,
              marginBottom: 30,
            }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.subtitle}>MyCoach</Text>

          <Text style={styles.text}>
            MyCoach is an innovative fitness app that redefines the gym
            experience by connecting users directly with personal trainers. It
            offers a unique feature that allows for seamless interaction,
            including real-time chat and progress tracking through interactive
            bar charts. With a variety of workout plans from experienced
            coaches, MyCoach provides personalized guidance and motivation. It's
            the ideal platform for those seeking a comprehensive, interactive
            tool to enhance their fitness journey and achieve their goals with
            expert support.
          </Text>
          <Text style={styles.sectionTitle}>Your Chefs</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  header: {
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  logo: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 2,
    width: 100,
    height: 100,
    backgroundColor: "white",
    resizeMode: "contain",
  },
  content: {
    marginTop: 20,
    flex: 1,
  },
  subtitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  chefImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
});

export default AboutUs;
