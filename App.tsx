import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ViewScreen from "./src/ViewScreen";
import ButtonScreen from "./src/ButtonScreen";
import ModalScreen from "./src/ModalScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView>
      <View>
        <StatusBar style="auto" />
        <ModalScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff1",
    alignItems: "center",
    justifyContent: "center",
  },
  containerDua: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
