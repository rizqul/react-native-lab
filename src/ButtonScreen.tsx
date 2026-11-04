import { View, Text, Button, TouchableOpacity, TouchableHighlight, Alert, TouchableWithoutFeedback, Pressable } from "react-native";
import React from "react";

const ButtonScreen = () => {
  return (
    <View>
      <Text>ButtonScreen</Text>

      {/* 1. Button */}
      <View>
        <Button title="click me!" onPress={() => console.log("Button clicked!")} />
      </View>

      {/* 2. TouchableOpacity */}
      <View>
        <TouchableOpacity style={{ backgroundColor: "green", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 4 }}>
          <Text style={{ color: "yellow" }}>Touchable Opacity</Text>
        </TouchableOpacity>
      </View>

      {/* 3. TouchableHighlight */}
      <View>
        <TouchableHighlight style={{ padding: 15, borderRadius: 8, alignItems: "center", marginTop: 2 }} underlayColor="lightgray" onPress={() => Alert.alert("Button Pressed")}>
          <Text style={{ color: "yellow" }}>Touchable highlight</Text>
        </TouchableHighlight>
      </View>

      {/* 4. TouchableWithoutFeedback */}
      <View style={{ backgroundColor: "grey", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 4 }}>
        <TouchableWithoutFeedback onPress={() => Alert.alert("Button Pressed")}>
          <Text style={{ color: "yellow" }}>Touchable Without Feedback</Text>
        </TouchableWithoutFeedback>
      </View>

      {/* 5. Pressable */}
      <View>
        <Pressable style={{ backgroundColor: "orange", padding: 15, borderRadius: 8, alignItems: "center", marginTop: 4 }}>
          <Text style={{ color: "blue" }}>Pressable</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ButtonScreen;
