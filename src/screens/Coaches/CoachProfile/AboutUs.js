import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import PictureLogo from "../../../../assets/3.png";
import CEO from "../../../../assets/MyCoachCEO.png";
const AboutUs = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>About Us</Text>
        </View>
        <View style={styles.content}>
          <Image
            source={PictureLogo} // Placeholder CEO Picture
            style={styles.logo}
          />
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
          <View style={styles.chefContainer}>
            <Image
              source={CEO} // Placeholder CEO Picture
              style={styles.chefImage}
            />
            <Text style={styles.chefName}>Abdulrazak Alqallaf</Text>
            <Text style={styles.chefTitle}>Founder and CEO</Text>
          </View>
          <View style={styles.chefContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }} // Placeholder CEO Picture
              style={styles.chefImage}
            />
            <Text style={styles.chefName}>Soud Alenezi</Text>
            <Text style={styles.chefTitle}>Co-Founder and SFO</Text>
          </View>
          <View style={styles.chefContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }} // Placeholder CEO Picture
              style={styles.chefImage}
            />
            <Text style={styles.chefName}>Aladdin Enbeh</Text>
            <Text style={styles.chefTitle}>Co-Founder and COO</Text>
          </View>
        </View>
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
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 30,
  },
  content: {
    marginTop: 20,
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
  chefContainer: {
    marginBottom: 20,

    borderRadius: 10,
    padding: 15,
    alignItems: "center",
  },
  chefImage: {
    width: 180,
    height: 180,
    borderRadius: 15,
    marginBottom: 10,
  },
  chefName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  chefTitle: {
    color: "#AAAAAA",
    fontSize: 14,
  },
});

export default AboutUs;
