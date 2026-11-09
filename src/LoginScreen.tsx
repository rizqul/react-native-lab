import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { useState } from "react";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    Alert.alert("berhasil login")
  }

  return (
    <View>
      <Text>Login Form</Text>
      <View>
        <Text>Email</Text>
        <TextInput
          className="text-sm font-medium text-black border border-green-300 px-4 py-2"
          placeholder="example@gmail.com"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
      </View>
      
      <View>
        <Text>Password</Text>
        <TextInput
          className="text-sm font-medium text-black border border-green-300 px-4 py-2"
          placeholder="******"
          keyboardType="default"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
