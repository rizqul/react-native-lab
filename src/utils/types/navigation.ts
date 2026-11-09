import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Login: undefined;
  // Modal: undefined;
  // Scroll: { email: string };
  MainTabs: NavigatorScreenParams<MainTabParamList>;
};

export type MainTabParamList = {
  Modal: undefined;
  Scroll: undefined;
};
