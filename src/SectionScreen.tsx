import { View, Text, SectionList } from "react-native";
import React from "react";
import { CONTACT_SECTIONS } from "./data/contacts";

const SectionScreen = () => {
  return (
    <View>
      <Text>Contact Screen</Text>
      <SectionList
        sections={CONTACT_SECTIONS}
        keyExtractor={(item) => item.id}
        renderItem={(item) => (
          <View>
            <Text className="text-4xl text-lime-500">
              {item.section.data[item.index].name} - {item.section.data[item.index].phone}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View>
            <Text className="text-9xl text-slate-900">{section.title}</Text>
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-7" />}
      />
    </View>
  );
};

export default SectionScreen;
