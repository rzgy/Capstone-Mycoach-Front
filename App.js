import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BoardNavigation from "./src/navigation/BoardNavigation";
import MainCoachNav from "./src/navigation/MainCoachNav";
import CoachContext from "./src/Context/CoachContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getName, getToken, removeToken } from "./src/api/storage";
import CoachStackNav from "./src/navigation/CoachNav/CoachStackNav";
import UserContext from "./src/Context/UserContext";
import MainAthleteNav from "./src/navigation/AthleteNav/MainAthleteNav";

const queryClient = new QueryClient();
export default function App() {
  const [coach, setCoach] = useState(false);
  const [user, setUser] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    const name = await getName();
    if (!token) {
      setCoach(false);
      setUser(false);
    } else {
      if (name == "coach") {
        setCoach(true);
      } else {
        setUser(true);
      }
    }
  };

  useEffect(() => {
    checkToken();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CoachContext.Provider value={[coach, setCoach]}>
        <UserContext.Provider value={[user, setUser]}>
          <View style={styles.container}>
            <NavigationContainer>
              {coach ? (
                <MainCoachNav />
              ) : user ? (
                <MainAthleteNav />
              ) : (
                <BoardNavigation />
              )}
            </NavigationContainer>
          </View>
        </UserContext.Provider>
      </CoachContext.Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
