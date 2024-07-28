import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import firstImage from "../../../assets/PT1.png";
import scondImage from "../../../assets/PT2.png";
import thirdImage from "../../../assets/PT3.png";
const { width: screenWidth } = Dimensions.get("window");

const slides = [
  {
    title: "From Beginner to Pro",
    description:
      " Introducing the My Coach, the ideal solution to track your workouts and achieve your fitness goals effortlessly and effectively.",
    image: firstImage, // Replace with your provided image URL
  },
  {
    title: "Your Perfect Companion \n for an Active Lifestyle",
    description:
      "Our app features a simple and elegant \n user interface, allowing you to monitor your daily workouts, record your progress,\n and receive personalized advice \n from top-notch fitness coaches.",
    image: scondImage, // Replace with your provided image URL
  },
  {
    title: "Your Health Journey \n Begins Here ",
    description:
      "Start your fitness journey today with the My Coach and enjoy reaching your health and fitness goals in an innovative and efficient way.",
    image: thirdImage, // Replace with your provided image URL
  },
];

const OnBoardingSlide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const handleContinue = () => {
    if (activeSlide === slides.length - 1) {
      navigation.navigate("ChooseyourCoach");
    } else {
      flatListRef.current.scrollToIndex({ index: activeSlide + 1 });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Image style={styles.image} source={item.image} />
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
          setActiveSlide(index);
        }}
      />
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { opacity: activeSlide === index ? 1 : 0.5 }]}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#182026",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  slide: {
    width: screenWidth,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 40, // Added marginTop to move title lower
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "white",
    marginHorizontal: 5,
  },
  continueButton: {
    backgroundColor: "#6898ab",
    padding: 15,
    borderRadius: 28,
    marginBottom: 40,
    marginHorizontal: 20,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default OnBoardingSlide;
