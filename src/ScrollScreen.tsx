import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { Menus } from "./data/menus";

const ScrollScreen = () => {
  return (
    <View>
      <ScrollView>
        {Menus.map((item) => (
          <View className="flex flex-row justify-between" key={item.id}>
            <View className="flex flex-row">
              <Image
                source={{ uri: item.imageURL }}
                style={{ width: 20, height: 20 }}
              />
              <Text>{item.name}</Text>
            </View>
            <Text>Rp {item.price.toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ScrollScreen;
