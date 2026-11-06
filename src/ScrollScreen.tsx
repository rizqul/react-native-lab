import { View, Text, ScrollView, Image, FlatList } from "react-native";
import React from "react";
import { Menus } from "./data/menus";

const ScrollScreen = () => {
  return (
    <View className="flex-1">
      {/* scroll view */}
      {/* <ScrollView>
        {Menus.map((item) => (
          <View className="flex flex-row justify-between" key={item.id}>
            <View className="flex flex-row">
              <Image source={{ uri: item.imageURL }} style={{ width: 20, height: 20 }} />
              <Text>{item.name}</Text>
            </View>
            <Text>Rp {item.price.toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView> */}

      {/* flat list */}
      <Text className="mt-8">Ini adalah flat list</Text>
      <FlatList
        // horizontal
        data={Menus}
        keyExtractor={(item) => `${item.id}`}
        ItemSeparatorComponent={() => (
          <View className="h-4 m-4 bg-blue">
            <Text>ini adalah item separator</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="flex flex-row">
            <Image source={{ uri: item.imageURL }} style={{ width: 20, height: 20 }} />
            <Text>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ScrollScreen;
