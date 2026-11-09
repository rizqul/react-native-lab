import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

import LoginScreen from "./src/LoginScreen";
import Navigation from "./src/navigation";

export default function App() {
  return <Navigation />;
}
