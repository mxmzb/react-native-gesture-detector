import React, { useState } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import GestureDetector, {
  GesturePath,
  Cursor,
  GestureRecorder,
} from "react-native-gesture-detector";

const CreateGestureScreen = () => {
  const [tmpOffset, setTmpOffset] = useState(null);
  const [finishedGesture, setFinishedGesture] = useState([]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureRecorder onPanRelease={gesture => setFinishedGesture(gesture)}>
        {({ gesture, offset }) => {
          if (tmpOffset !== offset && offset !== null) {
            setTmpOffset(offset);
          }

          return (
            <View
              style={{
                position: "relative",
                width: "90%",
                height: "50%",
                left: "5%",
                backgroundColor: "#eee",
              }}
            >
              <View style={{ position: "relative", width: "100%", height: "100%" }}>
                <GesturePath
                  path={gesture.map(coordinate => {
                    if (!tmpOffset) {
                      return coordinate;
                    }

                    return {
                      x: coordinate.x + tmpOffset.x,
                      y: coordinate.y + tmpOffset.y,
                    };
                  })}
                  color="green"
                  slopRadius={30}
                  center={false}
                />
              </View>
            </View>
          );
        }}
      </GestureRecorder>

      <GestureDetector
        onGestureFinish={() => Alert.alert(`Custom User Gesture finished!`)}
        gestures={{ CustomUserGesture: finishedGesture }}
      >
        {({ coordinate }) => (
          <View
            style={{
              position: "relative",
              width: "90%",
              height: "50%",
              left: "5%",
              backgroundColor: "red",
            }}
          >
            <View style={{ position: "relative", width: "100%", height: "100%" }}>
              <GesturePath
                path={finishedGesture.map(coordinate => {
                  if (!tmpOffset) {
                    return coordinate;
                  }

                  return {
                    x: coordinate.x + tmpOffset.x,
                    y: coordinate.y + tmpOffset.y,
                  };
                })}
                color="green"
                slopRadius={30}
                center={false}
              />
            </View>
            {coordinate && <Cursor {...coordinate} />}
          </View>
        )}
      </GestureDetector>
    </SafeAreaView>
  );
};

export default CreateGestureScreen;
