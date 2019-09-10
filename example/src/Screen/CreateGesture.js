import React, { useState } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import GestureDetector, {
  GesturePath,
  Cursor,
  GestureRecorder,
} from "react-native-gesture-detector";

const CreateGestureScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureRecorder>
        {({ gesture }) => {
          console.log("gesture", gesture);
          return (
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
                <GesturePath path={gesture} color="green" slopRadius={30} />
              </View>
            </View>
          );
        }}
      </GestureRecorder>
      {/* <View style={{ flex: 1 }}>
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
      </View> */}
    </SafeAreaView>
  );
};

export default CreateGestureScreen;
