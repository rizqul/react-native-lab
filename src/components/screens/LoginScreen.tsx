import { View, Text, TextInput, Alert, Image, ActivityIndicator, Pressable, GestureResponderEvent } from "react-native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types/navigation";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useState } from "react";
import { setError, setLoading } from "../../store/slice/uiSlice";
import { login } from "../../service/auth.service";
import { LoginForm } from "../../utils/types/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const loginSchema = z.object({
  email: z.email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

type FormValues = z.infer<typeof loginSchema>;

const LoginScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.ui.isLoading);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: LoginForm) => {
    try {
      dispatch(setLoading(true));
      const response = await login(values);

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "MainTabs",
            params: {
              screen: "Home",
              params: { email: response.customer.email },
            },
          },
        ],
      });
    } catch (error: any) {
      console.error("Login gagal:", error);

      const errorMessage = error.response?.data?.message || error.message || "Login gagal. Silakan coba lagi.";

      dispatch(setError(errorMessage));
      Alert.alert("Login Gagal ", errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 overflow-hidden">
        {/* Background Image */}
        <Image source={require("../../../assets/softBG.jpg")} resizeMode="cover" className="absolute inset-0 w-full h-full" />

        {/* Header */}
        <View className="justify-center items-center mt-28 gap-1 mb-6">
          <Text className="font-bold text-[#DA3D20] text-4xl">Log In</Text>

          <Text className="text-[#DA3D20] text-md">Please sign in to your existing account</Text>
        </View>

        {/* Form Container */}
        <View className="mt-12 bg-white w-full rounded-xl px-8 py-8 flex-1">
          {/* Email */}
          <Text className="font-bold text-lg mb-1 text-[#DA3D20]">Email</Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onChange, onBlur } }) => (
              <View>
                <View className="flex-row items-center bg-slate-400 px-6 py-3 rounded-md">
                  <TextInput placeholder="example@email.com" value={value} onChangeText={onChange} onBlur={onBlur} autoCapitalize="none" keyboardType="email-address" className="flex-1 text-md py-3 text-white" placeholderTextColor="#fff" />
                </View>
              </View>
            )}
          />

          {errors.email && <Text className="text-red-600 text-xs px-2 mt-1">{errors.email.message}</Text>}

          {/* Password */}
          <Text className="font-bold text-lg mb-1 mt-5 text-[#DA3D20]">Password</Text>

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <View className="flex-row items-center bg-slate-400 px-6 py-3 rounded-md">
                <TextInput placeholder="********" value={value} onChangeText={onChange} onBlur={onBlur} placeholderTextColor="#fff" secureTextEntry={!showPassword} className="flex-1 text-md text-white mr-4" />

                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Entypo name={showPassword ? "eye-with-line" : "eye"} size={22} color="white" />
                </Pressable>
              </View>
            )}
          />

          {errors.password && <Text className="text-red-600 text-xs px-2 mt-1">{errors.password.message}</Text>}

          {/* Button Login */}
          <Pressable className="w-full bg-[#DA3D20] px-3 py-2 rounded-md justify-center mt-10 mb-3" onPress={handleSubmit(onSubmit) as (e?: GestureResponderEvent) => void} disabled={loading || isSubmitting}>
            <Text className="font-bold text-white text-center text-lg">Log In</Text>
          </Pressable>

          {/* Footer */}
          <View className="justify-center items-center gap-5 mt-9">
            <View className="justify-center items-center flex-row gap-2">
              <Text>Don't have an account?</Text>
              <Pressable onPress={() => navigation.navigate("SignUp")}>
                <Text className="font-bold text-[#DA3D20]">Sign Up</Text>
              </Pressable>
            </View>

            <Text>Or</Text>

            <View className="justify-center flex-row gap-3">
              <Entypo name="facebook-with-circle" size={48} color="orange" />
              <Entypo name="twitter-with-circle" size={48} color="orange" />
              <Entypo name="instagram-with-circle" size={48} color="orange" />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
