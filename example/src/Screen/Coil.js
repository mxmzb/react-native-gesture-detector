import React, { useState } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import GestureDetector, { GesturePath } from "react-native-gesture-detector";

const gestures = {
  Coil: [
    { x: 10, y: -30 },
    { x: 25, y: -15 },
    { x: 40, y: -10 },
    { x: 55, y: -15 },
    { x: 70, y: -30 },
    { x: 85, y: -45 },
    { x: 90, y: -65 },
    { x: 85, y: -85 },
    { x: 70, y: -100 },
    { x: 55, y: -115 },
    { x: 40, y: -130 },
    { x: 20, y: -130 },
    { x: 0, y: -130 },
    { x: -20, y: -130 },
    { x: -35, y: -115 },
    { x: -50, y: -100 },
    { x: -65, y: -85 },
    { x: -80, y: -70 },
    { x: -80, y: -55 },
    { x: -80, y: -30 },
    { x: -80, y: -15 },
    { x: -80, y: 0 },
    { x: -65, y: 15 },
    { x: -50, y: 30 },
    { x: -35, y: 45 },
    { x: -20, y: 60 },
    { x: 0, y: 65 },
    { x: 20, y: 70 },
    { x: 40, y: 70 },
  ],
};

const CoilScreen = () => {
  const [progress, setProgress] = useState(null);
  const [gesture, setGesture] = useState(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: "90%",
            top: "5%",
          }}
        >
          <GestureDetector
            onGestureFinish={gesture => Alert.alert(`Gesture ${gesture} finished!`)}
            onProgress={({ gesture, progress }) => {
              setProgress(progress);
              setGesture(gesture);
            }}
            onPanRelease={() => {
              setProgress(null);
              setGesture(null);
            }}
            gestures={gestures}
          >
            {() => (
              <View
                style={{
                  position: "relative",
                  width: "90%",
                  height: "100%",
                  left: "5%",
                  backgroundColor: "#eee",
                }}
              >
                <View style={{ position: "relative", width: "100%", height: "100%" }}>
                  <GesturePath path={coilPath} color="green" slopRadius={35} />
                </View>
              </View>
            )}
          </GestureDetector>
        </View>

        <View
          style={{
            backgroundColor: "red",
            width: "90%",
            minHeight: 50,
            left: "5%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Gesture: {gesture}</Text>
          <Text>Progress: {progress}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CoilScreen;
