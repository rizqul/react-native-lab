import { View, Text } from "react-native";
import React from "react";
import { MainTabParamList } from "../utils/types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ModalScreen from "../ModalScreen";
import ScrollScreen from "../ScrollScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerShown: false
        tabBarActiveTintColor: "#123",
        tabBarInactiveTintColor: "#8003",
        tabBarStyle: { backgroundColor: "yellow" },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "airplane";

          if (route.name == "Modal") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name == "Scroll") {
            iconName = focused ? "alarm" : "alarm-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Modal" component={ModalScreen} />
      <Tab.Screen name="Scroll" component={ScrollScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
