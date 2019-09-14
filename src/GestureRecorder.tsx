import React, { ReactNode } from "react";
// @ts-ignore or we will break expo example
import { PanGestureHandler, State } from "react-native-gesture-handler";

import useGestureStore from "./useGestureStore";
import useRecorder from "./useRecorder";

import { PanGestureHandlerEventExtra, Coordinate, Direction } from "./Types";

type Props = {
  children: (props: {
    gesture: Coordinate[];
    gestureDirectionHistory: Direction[];
    offset: Coordinate | null;
  }) => ReactNode;
  pointDistance: number;
  onCapture: () => void;
  onPanRelease: (gesture: Coordinate[]) => void;
};

const GestureCapture = ({ children, onCapture, onPanRelease, pointDistance }: Props) => {
  const { reset: resetStore, addBreadcrumbToPath, setCoordinate, path, offset } = useGestureStore();
  const { reset: resetRecorder, gesture, gestureDirectionHistory } = useRecorder({
    path,
    pointDistance,
    onCapture,
  });

  const reset = () => {
    resetStore();
    resetRecorder();
  };

  return (
    <PanGestureHandler
      onGestureEvent={({ nativeEvent }: { nativeEvent: PanGestureHandlerEventExtra }) => {
        addBreadcrumbToPath(nativeEvent);
        setCoordinate({ x: nativeEvent.x, y: nativeEvent.y });
      }}
      onHandlerStateChange={({ nativeEvent }: { nativeEvent: PanGestureHandlerEventExtra }) => {
        if (nativeEvent.state === State.END) {
          reset();
          onPanRelease(gesture);
        }
      }}
    >
      {children({ gesture, gestureDirectionHistory, offset })}
    </PanGestureHandler>
  );
};

GestureCapture.defaultProps = {
  pointDistance: 20,
  onCapture: () => {},
  onPanRelease: () => {},
};

export default GestureCapture;
