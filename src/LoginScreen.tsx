import { View, Text, TextInput, Button, Alert, GestureResponderEvent } from "react-native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./utils/types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "panjang minimumnya adalah 8"),
});

type FormValues = z.infer<typeof loginSchema>;

const LoginScreen = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = () => {
    // navigation.navigate("Scroll");

    // navigation.push("Scroll", { email: "lala@coba.com" });

    // reset history
    navigation.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    });
  };

  return (
    <View>
      <Text>Login Form</Text>

      <View>
        <Text>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput className="text-sm font-medium text-black border border-green-300 px-4 py-2" placeholder="example@gmail.com" keyboardType="email-address" value={value} onChangeText={onChange} onBlur={onBlur} />
          )}
        />
        {errors.email && <Text className="text-sm text-red-700">{errors.email.message}</Text>}
      </View>

      <View>
        <Text>Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value, onBlur } }) => (
            <TextInput className="text-sm font-medium text-black border border-green-300 px-4 py-2" placeholder="******" keyboardType="default" value={value} onChangeText={onChange} onBlur={onBlur} secureTextEntry />
          )}
        />
        {errors.password && <Text className="text-sm text-red-700">{errors.password.message}</Text>}
      </View>

      <Button title="Login" onPress={handleSubmit(onSubmit) as (e?: GestureResponderEvent) => void} disabled={isSubmitting} />
    </View>
  );
};

export default LoginScreen;
