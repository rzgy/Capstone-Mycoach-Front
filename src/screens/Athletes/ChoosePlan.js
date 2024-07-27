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

const { width: screenWidth } = Dimensions.get("window");

const slides = [
  {
    title: "Gourmet Quality, Hassle-Free",
    description:
      "Savor chef-inspired meals without the hassle of cooking or cleaning up, with our gourmet meal delivery service.",
    image: "https://via.placeholder.com/300", // Replace with your provided image URL
  },
  {
    title: "Delicious and Nutritious Fresh Meals",
    description:
      "Enjoy healthy and delicious meals delivered to your doorstep, prepared with fresh, high-quality ingredients.",
    image: "https://via.placeholder.com/300", // Replace with your provided image URL
  },
  {
    title: "Your Coach can track your improvements here",
    description:
      "Create your own customized meal plan from our selection of healthy meal options.",
    image: "https://via.placeholder.com/300", // Replace with your provided image URL
  },
];

const OnBoardingSlide = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const handleContinue = () => {
    if (activeSlide === slides.length - 1) {
      navigation.navigate("ChooseCoach");
    } else {
      flatListRef.current.scrollToIndex({ index: activeSlide + 1 });
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      <Text style={styles.title}>{item.title}</Text>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
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
  slide: {
    width: screenWidth,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
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
