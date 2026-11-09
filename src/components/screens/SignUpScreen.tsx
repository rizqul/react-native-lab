import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView, KeyboardAvoidingView, Platform, ImageBackground, Alert, GestureResponderEvent } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { RegisterForm } from "../../utils/types/auth";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../utils/types/navigation";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

export default function SignUpScreen({ navigation }: Props) {
  const [agree, setAgree] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
    },
  });

  const onSubmit = async (values: RegisterForm) => {
    if (!agree) {
      setError("confirm", {
        message: "You must agree before creating an account",
      });
      return;
    }

    Alert.alert("Success", "Account created!");
    console.log(values);
  };

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="flex-1">
            {/* Background */}
            <ImageBackground
              source={{
                uri: "https://m.media-amazon.com/images/I/21u8gLR-HeL._AC_.jpg",
              }}
              resizeMode="cover"
              className="h-64 w-full"
              imageStyle={{
                width: "100%",
                height: "100%",
              }}
            >
              <View className="flex-1" />
            </ImageBackground>

            {/* Panel putih */}
            <View className="flex-1 -mt-20 rounded-t-[46px] bg-white px-6 pt-8 pb-10 shadow-lg">
              <View className="flex-1 justify-between">
                {/* Title */}
                <View>
                  <Text className="text-3xl font-bold text-gray-900 mb-6">Sign up</Text>

                  {/* FULL NAME */}
                  <View className="mb-4">
                    <Text className="text-sm font-medium text-gray-700 mb-1">Full Name</Text>

                    <Controller
                      control={control}
                      name="name"
                      rules={{
                        required: "Full name is required",
                        minLength: {
                          value: 3,
                          message: "Minimum 3 characters",
                        },
                      }}
                      render={({ field: { onChange, value } }) => (
                        <View className={`flex-row items-center pb-2 border-b ${errors.name ? "border-red-500" : "border-[#f59b95]"}`}>
                          <Ionicons name="person-outline" size={18} color={errors.name ? "#ef4444" : "#f59b95"} style={{ marginRight: 8 }} />

                          <TextInput
                            value={value}
                            onChangeText={(val) => {
                              onChange(val);
                              clearErrors("name");
                            }}
                            placeholder="Your full name"
                            placeholderTextColor="#d1d5db"
                            className="flex-1 text-base text-gray-800"
                          />
                        </View>
                      )}
                    />

                    {errors.name && <Text className="text-xs text-red-500 mt-1">{errors.name.message}</Text>}
                  </View>

                  {/* EMAIL */}
                  <View className="mb-4">
                    <Text className="text-sm font-medium text-gray-700 mb-1">Email</Text>

                    <Controller
                      control={control}
                      name="email"
                      rules={{
                        required: "Email is required",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Email format invalid",
                        },
                      }}
                      render={({ field: { onChange, value } }) => (
                        <View className={`flex-row items-center pb-2 border-b ${errors.email ? "border-red-500" : "border-[#f59b95]"}`}>
                          <Ionicons name="mail-outline" size={18} color={errors.email ? "#ef4444" : "#f59b95"} style={{ marginRight: 8 }} />

                          <TextInput
                            value={value}
                            onChangeText={(val) => {
                              onChange(val);
                              clearErrors("email");
                            }}
                            placeholder="demo@email.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#d1d5db"
                            className="flex-1 text-base text-gray-800"
                          />
                        </View>
                      )}
                    />

                    {errors.email && <Text className="text-xs text-red-500 mt-1">{errors.email.message}</Text>}
                  </View>

                  {/* PASSWORD */}
                  <View className="mb-4">
                    <Text className="text-sm font-medium text-gray-700 mb-1">Password</Text>

                    <Controller
                      control={control}
                      name="password"
                      rules={{
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Minimum 6 characters",
                        },
                      }}
                      render={({ field: { onChange, value } }) => (
                        <View className={`flex-row items-center pb-2 border-b ${errors.password ? "border-red-500" : "border-[#f59b95]"}`}>
                          <Ionicons name="lock-closed-outline" size={18} color={errors.password ? "#ef4444" : "#f59b95"} style={{ marginRight: 8 }} />

                          <TextInput
                            value={value}
                            onChangeText={(val) => {
                              onChange(val);
                              clearErrors("password");
                            }}
                            placeholder="Create password"
                            secureTextEntry
                            placeholderTextColor="#d1d5db"
                            className="flex-1 text-base text-gray-800"
                          />
                        </View>
                      )}
                    />

                    {errors.password && <Text className="text-xs text-red-500 mt-1">{errors.password.message}</Text>}
                  </View>

                  {/* CONFIRM */}
                  <View className="mb-2">
                    <Text className="text-sm font-medium text-gray-700 mb-1">Confirm Password</Text>

                    <Controller
                      control={control}
                      name="confirm"
                      rules={{
                        required: "Confirm password is required",
                        validate: (value, formValues) => value === formValues.password || "Passwords do not match",
                      }}
                      render={({ field: { onChange, value } }) => (
                        <View className={`flex-row items-center pb-2 border-b ${errors.confirm ? "border-red-500" : "border-[#f59b95]"}`}>
                          <Ionicons name="lock-closed-outline" size={18} color={errors.confirm ? "#ef4444" : "#f59b95"} style={{ marginRight: 8 }} />

                          <TextInput
                            value={value}
                            onChangeText={(val) => {
                              onChange(val);
                              clearErrors("confirm");
                            }}
                            placeholder="Re-enter password"
                            secureTextEntry
                            placeholderTextColor="#d1d5db"
                            className="flex-1 text-base text-gray-800"
                          />
                        </View>
                      )}
                    />

                    {errors.confirm && <Text className="text-xs text-red-500 mt-1">{errors.confirm.message}</Text>}
                  </View>

                  {/* Agree to Terms */}
                  <View className="flex-row items-center justify-between mt-4">
                    <Pressable
                      className="flex-row items-center"
                      onPress={() => {
                        setAgree((prev) => !prev);
                        clearErrors("confirm");
                      }}
                    >
                      <View className={`w-4 h-4 mr-2 rounded-[4px] border ${agree ? "bg-[#f59b95] border-[#f59b95]" : "border-gray-300"} items-center justify-center`}>{agree && <Ionicons name="checkmark" size={12} color="white" />}</View>

                      <Text className="text-xs text-gray-700">I agree to Terms & Privacy</Text>
                    </Pressable>
                  </View>

                  {!agree && <Text className="text-xs text-red-500 mt-1">You must agree before continuing</Text>}
                </View>

                {/* Button bottom */}
                <View className="mt-8">
                  <Pressable className={`py-3 rounded-2xl items-center mb-4 ${isSubmitting ? "bg-[#fbbfbd]" : "bg-[#f59b95]"}`} disabled={isSubmitting} onPress={handleSubmit(onSubmit) as (e?: GestureResponderEvent) => void}>
                    <Text className="text-white font-semibold text-base">{isSubmitting ? "Loading..." : "Create Account"}</Text>
                  </Pressable>

                  <View className="flex-row justify-center">
                    <Text className="text-xs text-gray-500">Already have an account?</Text>

                    <Pressable onPress={() => navigation.navigate("Login")}>
                      <Text className="text-xs font-semibold text-[#f59b95] ml-1">Sign in</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
