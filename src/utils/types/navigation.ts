import { NavigatorScreenParams } from "@react-navigation/native";

// untuk membuat daftar screen yang kita miliki beserta params yang akan diterima
export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
};

// untuk membuat daftar screen yang akan tertampil pada bottom tab beserta params yang akan diterima
export type MainTabParamList = {
  Home: { email?: string };
  Profile: undefined;
  Product: undefined;
  Transaction: undefined;
  History: undefined;
};
