import { Alert, Pressable, Text, View } from "react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { RegisterForm } from "../../utils/types/auth";
import { RootStackParamList } from "../../utils/types/navigation";
import { AuthButton } from "../auth/AuthButton";
import { AuthScreenLayout } from "../auth/AuthScreenLayout";
import { AuthTextField } from "../auth/AuthTextField";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

export default function SignUpScreen({ navigation }: Props) {
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ defaultValues: { name: "", email: "", password: "", confirm: "" } });

  const onSubmit = async () => {
    if (!agree) {
      setError("confirm", { message: "Please accept the terms to continue" });
      return;
    }
    Alert.alert("Registration unavailable", "Connect this form to your registration API before creating accounts.");
  };

  return (
    <AuthScreenLayout title="Create account" subtitle="Set up your account in a few quick steps.">
      <View className="flex-1 justify-between">
        <View>
          <Controller control={control} name="name" rules={{ required: "Full name is required", minLength: { value: 3, message: "Use at least 3 characters" } }} render={({ field: { value, onChange, onBlur } }) => <AuthTextField label="Full name" value={value} onChangeText={(text) => { onChange(text); clearErrors("name"); }} onBlur={onBlur} placeholder="Your full name" error={errors.name?.message} />} />
          <Controller control={control} name="email" rules={{ required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Enter a valid email address" } }} render={({ field: { value, onChange, onBlur } }) => <AuthTextField label="Email" value={value} onChangeText={(text) => { onChange(text); clearErrors("email"); }} onBlur={onBlur} placeholder="you@example.com" error={errors.email?.message} keyboardType="email-address" autoCapitalize="none" />} />
          <Controller
            control={control}
            name="password"
            rules={{ required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 characters" } }}
            render={({ field: { value, onChange, onBlur } }) => (
              <AuthTextField label="Password" value={value} onChangeText={(text) => { onChange(text); clearErrors("password"); }} onBlur={onBlur} placeholder="Create a password" error={errors.password?.message} secureTextEntry={!showPassword} accessory={<Pressable className="p-2" onPress={() => setShowPassword((visible) => !visible)} accessibilityLabel={showPassword ? "Hide password" : "Show password"}><Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#64748B" /></Pressable>} />
            )}
          />
          <Controller control={control} name="confirm" rules={{ required: "Please confirm your password", validate: (value, values) => value === values.password || "Passwords do not match" }} render={({ field: { value, onChange, onBlur } }) => <AuthTextField label="Confirm password" value={value} onChangeText={(text) => { onChange(text); clearErrors("confirm"); }} onBlur={onBlur} placeholder="Repeat your password" error={errors.confirm?.message} secureTextEntry={!showPassword} />} />
          <Pressable className="mt-1 flex-row items-center" onPress={() => { setAgree((current) => !current); clearErrors("confirm"); }} accessibilityRole="checkbox" accessibilityState={{ checked: agree }}>
            <View className={`mr-3 h-5 w-5 items-center justify-center rounded border ${agree ? "border-[#E85D45] bg-[#E85D45]" : "border-slate-300"}`}>{agree ? <Ionicons name="checkmark" size={14} color="white" /> : null}</View>
            <Text className="flex-1 text-sm text-slate-600">I agree to the Terms and Privacy Policy</Text>
          </Pressable>
        </View>
        <View className="gap-5 pt-8">
          <AuthButton onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>{isSubmitting ? "Creating account..." : "Create account"}</AuthButton>
          <View className="flex-row justify-center"><Text className="text-sm text-slate-500">Already have an account? </Text><Pressable onPress={() => navigation.navigate("Login")}><Text className="text-sm font-bold text-[#E85D45]">Sign in</Text></Pressable></View>
        </View>
      </View>
    </AuthScreenLayout>
  );
}
