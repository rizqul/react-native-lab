import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HistoryScreen from "../components/screens/HistoryScreen";
import HomeScreen from "../components/screens/HomeScreen";
import ProductScreen from "../components/screens/ProductScreen";
import ProfileScreen from "../components/screens/ProfileScreen";
import TransactionScreen from "../components/screens/TransactionScreen";
import { MainTabParamList } from "../utils/types/navigation";

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#FFA500",
        tabBarInactiveTintColor: "#808080",
        tabBarStyle: { backgroundColor: "white" },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Product") {
            iconName = focused ? "cube" : "cube-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Transaction") {
            iconName = focused ? "card" : "card-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Product" component={ProductScreen} />
      <Tab.Screen name="Transaction" component={TransactionScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
