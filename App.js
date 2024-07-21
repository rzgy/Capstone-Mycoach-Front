import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BoardNavigation from "./src/navigation/BoardNavigation";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <BoardNavigation />
        jjh
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
