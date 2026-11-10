import { Alert, Pressable, Text, View } from "react-native";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { RootStackParamList } from "../../utils/types/navigation";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setError, setLoading } from "../../store/slice/uiSlice";
import { login } from "../../service/auth.service";
import { LoginForm } from "../../utils/types/auth";
import { AuthButton } from "../auth/AuthButton";
import { AuthScreenLayout } from "../auth/AuthScreenLayout";
import { AuthTextField } from "../auth/AuthTextField";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const loginSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
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
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginForm) => {
    try {
      dispatch(setLoading(true));
      const response = await login(values);
      navigation.reset({ index: 0, routes: [{ name: "MainTabs", params: { screen: "Home", params: { email: response.customer.email } } }] });
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Unable to sign in. Please try again.";
      dispatch(setError(message));
      Alert.alert("Sign in failed", message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthScreenLayout title="Welcome back" subtitle="Sign in to continue to your account.">
      <View className="flex-1 justify-between">
        <View>
          <Controller control={control} name="email" render={({ field: { value, onChange, onBlur } }) => <AuthTextField label="Email" value={value} onChangeText={onChange} onBlur={onBlur} placeholder="you@example.com" error={errors.email?.message} keyboardType="email-address" autoCapitalize="none" />} />
          <Controller
            control={control}
            name="password"
            render={({ field: { value, onChange, onBlur } }) => (
              <AuthTextField
                label="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter your password"
                error={errors.password?.message}
                secureTextEntry={!showPassword}
                accessory={<Pressable className="p-2" onPress={() => setShowPassword((visible) => !visible)} accessibilityLabel={showPassword ? "Hide password" : "Show password"}><Entypo name={showPassword ? "eye-with-line" : "eye"} size={20} color="#64748B" /></Pressable>}
              />
            )}
          />
        </View>
        <View className="gap-5">
          <AuthButton onPress={handleSubmit(onSubmit)} disabled={loading || isSubmitting}>{loading || isSubmitting ? "Signing in..." : "Sign in"}</AuthButton>
          <View className="flex-row justify-center"><Text className="text-sm text-slate-500">New here? </Text><Pressable onPress={() => navigation.navigate("SignUp")}><Text className="text-sm font-bold text-[#E85D45]">Create an account</Text></Pressable></View>
        </View>
      </View>
    </AuthScreenLayout>
  );
};

export default LoginScreen;
