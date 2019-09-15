import React, { useState } from "react";
import { SafeAreaView, View, Text, Alert } from "react-native";
import _ from "lodash";
import GestureDetector, {
  GesturePath,
  Cursor,
  GestureRecorder,
} from "react-native-gesture-detector";

const CreateGestureScreen = () => {
  const [recorderOffset, setRecorderOffset] = useState(null);
  const [detectorOffset, setDetectorOffset] = useState(null);
  const [finishedGesture, setFinishedGesture] = useState([]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GestureRecorder
        onPanRelease={gesture => {
          setFinishedGesture(gesture);
          setDetectorOffset(recorderOffset);
        }}
      >
        {({ gesture, offset }) => {
          if (!_.isEqual(offset, recorderOffset) && offset !== null) {
            setRecorderOffset(offset);
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
                    if (recorderOffset) {
                      return {
                        x: coordinate.x + recorderOffset.x,
                        y: coordinate.y + recorderOffset.y,
                      };
                    }

                    return coordinate;
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
                  if (detectorOffset) {
                    return {
                      x: coordinate.x + detectorOffset.x,
                      y: coordinate.y + detectorOffset.y,
                    };
                  }

                  return coordinate;
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
