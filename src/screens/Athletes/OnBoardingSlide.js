import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Button, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const OnBoardingSlide = () => {
  const Navigation = useNavigation();
  const handleGoToChoosyourCoach = () => {
    Navigation.navigate("ChooseyourCoach");
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        paddingTop: 20,
        paddingHorizontal: 10,
        backgroundColor: "#182026",
      }}
    >
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
          }}
        >
          Your Coach can track your improvements here
        </Text>
        <View>
          <Image
            style={{ width: 300, height: 300 }}
            source={require("../../../assets/PT.png")}
          />
        </View>
        <View style={{ marginTop: 50 }}>
          <Text style={{ textAlign: "center", fontSize: 20, color: "white" }}>
            Create your own customized meal plan from our selection of healthy
            meal options.
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#6898ab",
            padding: 10,
            borderRadius: 28,
          }}
          onPress={handleGoToChoosyourCoach}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default OnBoardingSlide;

const styles = StyleSheet.create({});
