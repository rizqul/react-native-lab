import AsyncStorage from "@react-native-async-storage/async-storage";
import "./global.css";
import Navigation from "./src/navigation";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
import WelcomeScreen from "./src/components/screens/WelcomeScreen";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [hasSeenOnBoarding, setHasSeenOnBoarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem("hasSeenOnboarding");
        setHasSeenOnBoarding(value === "true");
      } finally {
        setLoading(false);
      }
    };
    checkOnboarding();
  }, []);

  const handleFinishOnboarding = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    setHasSeenOnBoarding(true);
  };

  if (loading || hasSeenOnBoarding === null) {
    return (
      <Provider store={store}>
        <View className="flex-1 items-center justify-center bg-[#f7a8a3]">
          <ActivityIndicator color="#fff" />
        </View>
      </Provider>
    );
  }
  if (!hasSeenOnBoarding) {
    return (
      <Provider store={store}>
        <WelcomeScreen onContinue={handleFinishOnboarding} />
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
