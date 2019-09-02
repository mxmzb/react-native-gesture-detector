import React, { useState } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import GestureDetector, { GesturePath } from "react-native-gesture-detector";

const gestures = {
  "Parabola Left": [
    { x: 0, y: 0 },
    { x: 0, y: 30 },
    { x: 0, y: 60 },
    { x: 0, y: 90 },
    { x: 0, y: 120 },
    { x: -15, y: 150 },
    { x: -45, y: 165 },
    { x: -75, y: 165 },
    { x: -105, y: 165 },
  ],
  "Straight Down": [
    { x: 0, y: 0 },
    { x: 0, y: 30 },
    { x: 0, y: 60 },
    { x: 0, y: 90 },
    { x: 0, y: 120 },
    { x: 0, y: 150 },
    { x: 0, y: 180 },
    { x: 0, y: 210 },
    { x: 0, y: 240 },
  ],
  "Straight Up": [
    { x: 0, y: 0 },
    { x: 0, y: -30 },
    { x: 0, y: -60 },
    { x: 0, y: -90 },
    { x: 0, y: -120 },
    { x: 0, y: -150 },
    { x: 0, y: -180 },
    { x: 0, y: -210 },
    { x: 0, y: -240 },
    { x: 0, y: -270 },
  ],
  "Parabola Right": [
    { x: 0, y: 0 },
    { x: 0, y: 30 },
    { x: 0, y: 60 },
    { x: 0, y: 90 },
    { x: 0, y: 120 },
    { x: 15, y: 150 },
    { x: 45, y: 165 },
    { x: 75, y: 165 },
    { x: 105, y: 165 },
  ],
};

const MultipleScreen = () => {
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
                  <GesturePath path={gestures["Straight Down"]} color="green" slopRadius={35} />
                  <GesturePath path={gestures["Parabola Left"]} color="blue" slopRadius={35} />
                  <GesturePath path={gestures["Parabola Right"]} color="red" slopRadius={35} />
                  <GesturePath path={gestures["Straight Up"]} color="yellow" slopRadius={35} />
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

export default MultipleScreen;
