import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, Switch, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { CompositeNavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import { MainTabParamList, RootStackParamList } from "../../utils/types/navigation";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useTheme from "../../hooks/useTheme";
import { Customer } from "../../utils/types/auth";
import { setError, setLoading } from "../../store/slice/uiSlice";
import { getCurrentUser, logout } from "../../service/auth.service";

type ProfileScreenNavigationProp = CompositeNavigationProp<BottomTabNavigationProp<MainTabParamList, "Profile">, NativeStackNavigationProp<RootStackParamList>>;

export default function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.ui.isLoading);
  const { toggleTheme, colors, isDark } = useTheme();

  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    loadCustomerData();
  }, []);

  const loadCustomerData = async () => {
    try {
      dispatch(setLoading(true));
      const userData = await getCurrentUser();
      setCustomer(userData);
    } catch (error) {
      console.error("Error loading customer data:", error);
      dispatch(setError("Gagal memuat data customer"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Apakah Anda yakin ingin logout?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            setLoggingOut(true);
            await logout();

            navigation.getParent()?.reset({
              index: 0,
              routes: [{ name: "Login" }],
            });
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Error", "Gagal logout. Silakan coba lagi.");
          } finally {
            setLoggingOut(false);
          }
        },
      },
    ]);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center" style={{ backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text className="mt-2" style={{ color: colors.textSecondary }}>
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="px-6 py-8">
        {/* Header */}
        <Text className="text-3xl font-bold mb-8" style={{ color: colors.text }}>
          Profile
        </Text>

        {/* Theme Toggle */}
        <View className="mb-6 rounded-2xl p-4 shadow-sm" style={{ backgroundColor: colors.card }}>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1">
              <Ionicons name={isDark ? "moon" : "sunny"} size={20} color={colors.primary} />
              <View className="ml-3">
                <Text className="text-base font-semibold" style={{ color: colors.text }}>
                  {isDark ? "Dark Mode" : "Light Mode"}
                </Text>
                <Text className="text-xs" style={{ color: colors.textSecondary }}>
                  {isDark ? "Switch to light theme" : "Switch to dark theme"}
                </Text>
              </View>
            </View>
            <Switch value={isDark} onValueChange={toggleTheme} trackColor={{ false: "#D1D5DB", true: colors.primary }} thumbColor={isDark ? "#FFFFFF" : "#F3F4F6"} />
          </View>
        </View>

        {/* User Info Card */}
        {customer && (
          <View className="rounded-2xl p-6 mb-6 shadow-sm" style={{ backgroundColor: colors.card }}>
            <View className="items-center mb-6">
              <View className="w-24 h-24 rounded-full items-center justify-center mb-4" style={{ backgroundColor: colors.primary }}>
                <Ionicons name="person" size={48} color="white" />
              </View>
              <Text className="text-2xl font-bold" style={{ color: colors.text }}>
                {customer.fullname}
              </Text>
              <View className="px-3 py-1 rounded-full mt-2" style={{ backgroundColor: colors.primary }}>
                <Text className="text-white text-xs font-semibold uppercase">{customer.role}</Text>
              </View>
            </View>

            <View className="space-y-4">
              {/* Email */}
              <View className="flex-row items-center py-3 border-b" style={{ borderColor: colors.border }}>
                <Ionicons name="mail-outline" size={20} color={colors.primary} />
                <View className="ml-3 flex-1">
                  <Text className="text-xs" style={{ color: colors.textSecondary }}>
                    Email
                  </Text>
                  <Text className="text-base" style={{ color: colors.text }}>
                    {customer.email}
                  </Text>
                </View>
              </View>

              {/* Phone */}
              <View className="flex-row items-center py-3 border-b" style={{ borderColor: colors.border }}>
                <Ionicons name="call-outline" size={20} color={colors.primary} />
                <View className="ml-3 flex-1">
                  <Text className="text-xs" style={{ color: colors.textSecondary }}>
                    Phone
                  </Text>
                  <Text className="text-base" style={{ color: colors.text }}>
                    {customer.phoneNumber}
                  </Text>
                </View>
              </View>

              {/* Address */}
              <View className="flex-row items-center py-3 border-b" style={{ borderColor: colors.border }}>
                <Ionicons name="location-outline" size={20} color={colors.primary} />
                <View className="ml-3 flex-1">
                  <Text className="text-xs" style={{ color: colors.textSecondary }}>
                    Address
                  </Text>
                  <Text className="text-base" style={{ color: colors.text }}>
                    {customer.address}
                  </Text>
                </View>
              </View>

              {/* Birthdate */}
              <View className="flex-row items-center py-3">
                <Ionicons name="calendar-outline" size={20} color={colors.primary} />
                <View className="ml-3 flex-1">
                  <Text className="text-xs" style={{ color: colors.textSecondary }}>
                    Birthdate
                  </Text>
                  <Text className="text-base" style={{ color: colors.text }}>
                    {new Date(customer.birthdate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Logout Button */}
        <Pressable className="flex-row items-center justify-center py-4 rounded-2xl" style={{ backgroundColor: loggingOut ? colors.border : colors.error }} onPress={handleLogout} disabled={loggingOut}>
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text className="text-white font-semibold text-base ml-2">{loggingOut ? "Logging out..." : "Logout"}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
