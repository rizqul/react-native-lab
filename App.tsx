import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import ViewScreen from "./src/ViewScreen";
import ButtonScreen from "./src/ButtonScreen";
import ModalScreen from "./src/ModalScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import ImageScreen from "./src/ImageScreen";

export default function App() {
  return (
    <SafeAreaView>
      <ScrollView horizontal={true}>
        <View>
          <StatusBar style="auto" />
          <ImageScreen />
          <ImageScreen />
          <ImageScreen />
          <ImageScreen />
          <ImageScreen />
        </View>
      </ScrollView>
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
