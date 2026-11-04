import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ViewScreen from "./src/ViewScreen";
import ButtonScreen from "./src/ButtonScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <ViewScreen />
      <ButtonScreen />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
