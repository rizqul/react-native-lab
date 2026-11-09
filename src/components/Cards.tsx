import React from "react";
import { View, Text, Image } from "react-native";
import { Menu } from "../utils/types/menu.type";

interface CardsProps {
  menuProps: Menu;
}

const Cards = ({ menuProps }: CardsProps) => {
  return (
    <View className="w-full rounded-2xl bg-white shadow-md overflow-hidden">
      {/* Menu Image */}
      <Image className="w-full h-44" source={{ uri: menuProps.imageURL }} resizeMode="cover" />

      {/* Menu Information */}
      <View className="p-4 gap-3">
        <Text className="text-lg font-bold text-gray-800">{menuProps.name}</Text>

        {/* Price and Quantity */}
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-xs text-gray-500 mb-1">Price</Text>
            <Text className="text-base font-bold text-green-600">Rp {menuProps.price}</Text>
          </View>

          <View className="bg-gray-100 rounded-full px-3 py-2">
            <Text className="text-sm font-semibold text-gray-700">Stock: {menuProps.qty}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Cards;
