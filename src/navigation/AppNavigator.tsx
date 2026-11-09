import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../utils/types/navigation";
import LoginScreen from "../LoginScreen";
import ModalScreen from "../ModalScreen";
import ScrollScreen from "../ScrollScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Modal" component={ModalScreen} />
      <Stack.Screen name="Scroll" component={ScrollScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
