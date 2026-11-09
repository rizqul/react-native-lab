import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../utils/types/navigation";
import LoginScreen from "../LoginScreen";
import ModalScreen from "../ModalScreen";
import ScrollScreen from "../ScrollScreen";
import MainTabNavigator from "./MainTabNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      // screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="Modal" component={ModalScreen} />
      <Stack.Screen name="Scroll" component={ScrollScreen} /> */}
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
