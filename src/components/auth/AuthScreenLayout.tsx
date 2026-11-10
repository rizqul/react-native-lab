import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNode } from "react";

type AuthScreenLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export function AuthScreenLayout({ title, subtitle, children }: AuthScreenLayoutProps) {
  return (
    <KeyboardAvoidingView className="flex-1 bg-[#FFF7F5]" behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View className="bg-[#E85D45] px-6 pb-16 pt-12">
            <Text className="text-3xl font-bold text-white">{title}</Text>
            <Text className="mt-2 text-base text-[#FFE9E3]">{subtitle}</Text>
          </View>
          <View className="-mt-6 flex-1 rounded-t-3xl bg-white px-6 pb-10 pt-8">{children}</View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
