import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BoardNavigation from "./src/navigation/BoardNavigation";
import MainCoachNav from "./src/navigation/MainCoachNav";
import CoachContext from "./src/Context/UserContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getToken, removeToken } from "./src/api/storage";

const queryClient = new QueryClient();
export default function App() {
  const [coach, setCoach] = useState(false);

  const checkToken = async () => {
    const token = await getToken();
    if (!token) {
      setCoach(false);
    } else {
      setCoach(true);
    }
  };

  useEffect(() => {
    checkToken();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CoachContext.Provider value={[coach, setCoach]}>
        <View style={styles.container}>
          <NavigationContainer>
            {coach ? <MainCoachNav /> : <BoardNavigation />}
          </NavigationContainer>
        </View>
      </CoachContext.Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
