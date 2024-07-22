import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const OnBoardingSlide = () => {
  const Navigation = useNavigation();
  const handleGoToChoosePlan = () => {
    Navigation.navigate("ChoosePlan");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 80,
        backgroundColor: "#182026",
      }}
    >
      <View>
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

        <View
          style={{ backgroundColor: "#6898ab", padding: 10, borderRadius: 28 }}
        >
          <Button
            title=" Continue"
            color="white"
            onPress={handleGoToChoosePlan}
          />
        </View>
      </View>
    </View>
  );
};

export default OnBoardingSlide;

const styles = StyleSheet.create({});
