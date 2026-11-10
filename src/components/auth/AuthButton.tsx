import { ReactNode } from "react";
import { Pressable, Text } from "react-native";

type AuthButtonProps = {
  children: ReactNode;
  onPress: () => void;
  disabled?: boolean;
};

export function AuthButton({ children, onPress, disabled = false }: AuthButtonProps) {
  return (
    <Pressable className={`items-center rounded-xl py-4 ${disabled ? "bg-[#F2B4A8]" : "bg-[#E85D45]"}`} onPress={onPress} disabled={disabled}>
      <Text className="text-base font-bold text-white">{children}</Text>
    </Pressable>
  );
}
