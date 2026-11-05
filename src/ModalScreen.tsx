import { useState } from "react";
import { View, Text, Button, Modal } from "react-native";

const ModalScreen = () => {
  const [visibility, setVisibility] = useState(false);

  return (
    <View style={{ width: 300 }}>
      <Text style={{ margin: 4 }}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, dignissimos ex esse optio dolorum sint facilis praesentium illum, distinctio alias necessitatibus nisi ipsum debitis nobis eveniet sit ullam! Est, repudiandae.
      </Text>
      <Button title="show modal" onPress={() => setVisibility(true)} />
      <Modal transparent visible={visibility} style={{ justifyContent: "center" }} animationType="slide">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "red" }}>
          <View
            style={{
              margin: 20,
              backgroundColor: "yellow",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "grey",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <Text style={{ fontSize: 16, color: "blue", margin: 4 }}>Silahkan tutup modalnya</Text>
            <Button title="close modal" onPress={() => setVisibility(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalScreen;
