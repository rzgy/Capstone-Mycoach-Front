import { useQuery } from "@tanstack/react-query";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Image } from "react-native-elements";
import { BASE_URL } from "../../api";
import { fetchAllCoaches } from "../../api/CoachApi/CoachApi";
import { useState } from "react";

const ChooseCoach = () => {
  const [shoeModal, setShoeModal] = useState(false);
  const { data: coaches } = useQuery({
    queryKey: ["coaches"],
    queryFn: fetchAllCoaches,
  });

  const Navigation = useNavigation();
  const handleGoToChoosyourCoach = () => {
    Navigation.navigate("ChooseyourCoach");
  };
  const navigation = useNavigation();
  const handleGoToCreateAccount = () => {
    setShoeModal(false);
    navigation.navigate("loginAthlete");
  };

  return (
    <View
      style={{
        backgroundColor: "#182026",
        paddingTop: 80,
        flex: 1,
        flexDirection: "column",
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

      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
          padding: 20,
          gap: 30,
        }}
      >
        {/* ****************************************Modal********************************************************* */}
        <Modal visible={shoeModal} transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <View
              style={{
                margin: 20,
                backgroundColor: "white",
                borderRadius: 30,
                padding: 50,
                alignItems: "center",
              }}
            >
              {/* ****************************************Hello********************************************************* */}
              <Text style={{ marginBottom: 15, textAlign: "center" }}>
                Hello!
              </Text>
              {/* ****************************************Text********************************************************* */}
              <Text style={{ marginBottom: 15, textAlign: "center" }}>
                Welcome to My coach Application
              </Text>

              {/* ****************************************Button Close ********************************************************* */}
              <View
                style={{
                  flexDirection: "row",
                  gap: 50,
                  padding: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "#6898ab",
                    padding: 10,
                    borderRadius: 28,
                  }}
                  onPress={() => {
                    setShoeModal(false);
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Close
                  </Text>
                </TouchableOpacity>
                {/* ****************************************Button subscription ********************************************************* */}
                <TouchableOpacity
                  style={{
                    backgroundColor: "#6898ab",
                    padding: 10,
                    borderRadius: 28,
                  }}
                  onPress={handleGoToCreateAccount}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    subscription
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {coaches?.map((coach) => (
          <TouchableOpacity
            onPress={() => setShoeModal(true)}
            style={{
              width: "45%",
              aspectRatio: 1,
            }}
            key={coach._id}
          >
            <Image
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 22,
                overflow: "hidden",
              }}
              source={{
                uri: `${BASE_URL}/${coach.image}`,
              }}
            />
            <View>
              <Text style={{ color: "white", textAlign: "center" }}>
                {coach.fullname}
              </Text>
            </View>
          </TouchableOpacity>
          // <View
          //   style={{ width: "45%", height: 100, backgroundColor: "green" }}
          // />
        ))}
      </ScrollView>
    </View>
  );
};

export default ChooseCoach;
const styles = StyleSheet.create({});
