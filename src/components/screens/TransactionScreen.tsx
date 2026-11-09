import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { MainTabParamList } from "../../utils/types/navigation";
import useTheme from "../../hooks/useTheme";

type Props = NativeStackScreenProps<MainTabParamList, "Transaction">;

const TransactionScreen = ({}: Props) => {
  const { colors } = useTheme();

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-1 px-6 py-8">
        <Text className="text-3xl font-bold mb-8 text-center" style={{ color: colors.text }}>
          Transactions
        </Text>

        <View className="flex-1 items-center ">
          <View className="w-24 h-24 rounded-full items-center justify-center mb-4" style={{ backgroundColor: colors.primaryDark }}>
            <Ionicons name="receipt-outline" size={48} color="#EEEEEE" />
          </View>
          <Text className="text-lg font-bold mb-2 " style={{ color: colors.textSecondary }}>
            No Transactions Yet
          </Text>
          <Text className="text-center" style={{ color: colors.textSecondary }}>
            Your transaction history will appear here
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TransactionScreen;
