import { View, Text, Button } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainTabParamList, RootStackParamList } from "../types/navigation";

type Props = NativeStackScreenProps<MainTabParamList, "History">;

const HistoryScreen = ({}: Props) => {
  return (
    <View className="flex-1 justify-center items-center" style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text className="text-lg font-bold text-red-600">HistoryScreen</Text>
    </View>
  );
};

export default HistoryScreen;
