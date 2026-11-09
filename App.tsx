import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

import ImageScreen from "./src/ImageScreen";
import ScrollScreen from "./src/ScrollScreen";
import SectionScreen from "./src/SectionScreen";

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold text-blue-500"> Welcome to Nativewind! </Text>
        {/* <ImageScreen /> */}
        {/* <ScrollScreen /> */}
        <SectionScreen />
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
