import React, { useState } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import GestureDetector, { GesturePath, Cursor } from "react-native-gesture-detector";

const gestures = {
  Triangle: [
    { x: 0, y: 0 },
    { x: 10, y: 20 },
    { x: 20, y: 40 },
    { x: 30, y: 60 },
    { x: 40, y: 80 },
    { x: 50, y: 100 },
    { x: 60, y: 120 },
    { x: 70, y: 140 },
    { x: 80, y: 160 },
    { x: 60, y: 160 },
    { x: 40, y: 160 },
    { x: 20, y: 160 },
    { x: 0, y: 160 },
    { x: -20, y: 160 },
    { x: -40, y: 160 },
    { x: -60, y: 160 },
    { x: -80, y: 160 },
    { x: -70, y: 140 },
    { x: -60, y: 120 },
    { x: -50, y: 100 },
    { x: -40, y: 80 },
    { x: -30, y: 60 },
    { x: -20, y: 40 },
    { x: -10, y: 20 },
    { x: 0, y: 0 },
  ],
};

const TriangleScreen = () => {
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
            {({ coordinate }) => (
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
                  <GesturePath path={gestures["Triangle"]} color="green" slopRadius={30} />
                </View>
                {coordinate && <Cursor {...coordinate} />}
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

export default TriangleScreen;
