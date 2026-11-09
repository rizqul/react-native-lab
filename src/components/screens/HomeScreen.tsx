import { View, Text, Button, Pressable } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainTabParamList } from "../../utils/types/navigation";
import useTheme from "../../hooks/useTheme";

type Props = NativeStackScreenProps<MainTabParamList, "Home">;
const HomeScreen = ({ navigation, route }: Props) => {
  const { email } = route.params;
  const { colors } = useTheme();

  return (
    <View className="flex-1 justify-center items-center" style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text className="text-lg font-bold text-red-600">HomeScreen</Text>
      <Text>{email}</Text>
      <Pressable className="py-3 rounded-xl mb-3 items-center" style={{ backgroundColor: colors.primary }} onPress={() => navigation.popToTop()}>
        <Text className="text-white font-semibold text-base">Back to Top</Text>
      </Pressable>
      <Button title="email lain" onPress={() => navigation.navigate("Home", { email: "laleElManino@mail.com" })} />
    </View>
  );
};

export default HomeScreen;
