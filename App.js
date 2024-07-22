import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BoardNavigation from "./src/navigation/BoardNavigation";
import MainCoachNav from "./src/navigation/MainCoachNav";
import CoachContext from "./src/Context/UserContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";

const queryClient = new QueryClient();
export default function App() {
  const [coach, setCoach] = useState();
  return (
    <QueryClientProvider client={queryClient}>
      <CoachContext.Provider value={[coach, setCoach]}>
        <View style={styles.container}>
          <NavigationContainer>
            <BoardNavigation />
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
