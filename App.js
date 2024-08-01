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
import SelectedPlayerContext from "./src/Context/SelectedPlayerContext";
import { socket } from "./src/api";

const queryClient = new QueryClient();
export default function App() {
  const [coach, setCoach] = useState(false);
  const [user, setUser] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(false);

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
    socket.connect();
  }, []);

  return (
    <SelectedPlayerContext.Provider value={[selectedPlayer, setSelectedPlayer]}>
      <CoachContext.Provider value={[coach, setCoach]}>
        <UserContext.Provider value={[user, setUser]}>
          <QueryClientProvider client={new QueryClient()}>
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
          </QueryClientProvider>
        </UserContext.Provider>
      </CoachContext.Provider>
    </SelectedPlayerContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
