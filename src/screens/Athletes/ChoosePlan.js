import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Button, Image } from "react-native-elements";
import { BASE_URL } from "../../api";
import { fetchAllCoaches } from "../../api/CoachApi/CoachApi";

const ChoosePlan = () => {
  const Navigation = useNavigation();
  const handleGoToChoosePlan = () => {
    Navigation.navigate("CreateAccount");
  };

  const { data: coaches } = useQuery({
    queryKey: ["coaches"],
    queryFn: fetchAllCoaches,
  });
  console.log("tstet", coaches);
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
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          textAlign: "center",
          color: "white",
        }}
      >
        Choose Your Choach
      </Text>
      <View>
        {coaches?.map((coach) => (
          <View>
            <View key={coach._id}>
              <Image
                style={{ width: 200, height: 200 }}
                source={{
                  uri: `${BASE_URL}/${coach.image}`,
                }}
              />
            </View>

            <View>
              <Text>{coach.fullname}</Text>
            </View>
            <View>
              <Text>{coach.email}</Text>
            </View>
          </View>
        ))}
      </View>
      <View
        style={{
          backgroundColor: "#6898ab",
          padding: 10,
          borderRadius: 28,
          width: "100%",
        }}
      >
        <Button
          title=" Continue"
          color="white"
          onPress={handleGoToChoosePlan}
        />
      </View>
    </View>
  );
};

export default ChoosePlan;

const styles = StyleSheet.create({});
