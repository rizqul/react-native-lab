import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  onContinue: () => void;
};

export default function WelcomeScreen({ onContinue }: Props) {
  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1 justify-center mb-0">
        <Image source={require("../../../assets/undraw_welcoming_42an.png")} className="self-center w-80 h-80" resizeMode="contain" />
      </View>

      <View className="h-1/3 px-6 mb-14 pb-10">
        <Text className="text-3xl font-bold text-[#F87B1B] mb-5 text-center">Welcome</Text>
        <Text className="text-justify px-7 mb-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur aut ipsa a, alias facilis quam eius impedit recusandae expedita voluptatum temporibus architecto neque aliquam eos repellendus esse ipsam dolore quisquam.
        </Text>
        <Pressable onPress={onContinue} className="bg-[#F87B1B] py-3 px-5 mx-5 rounded-2xl items-center active:bg-[#11224E]">
          <Text className="text-white font-semibold text-base">Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
