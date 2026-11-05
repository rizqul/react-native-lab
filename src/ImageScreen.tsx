import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";

const ImageScreen = () => {
  return (
    <View>
      <Text>Image Screen</Text>
      <Image
        source={{ uri: "https://picsum.photos/id/237/200/300" }}
        style={{
          width: 200,
          height: 300,
        }}
      />
      <Text>Internal Image</Text>
      <Image source={require("../assets/dog.jpg")} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ImageScreen;
