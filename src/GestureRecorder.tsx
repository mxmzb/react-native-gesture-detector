import React, { ReactNode } from "react";
// @ts-ignore or we will break expo example
import { PanGestureHandler, State } from "react-native-gesture-handler";

import useGestureStore from "./useGestureStore";
import useRecorder from "./useRecorder";

import { PanGestureHandlerEventExtra, Coordinate } from "./Types";

type Props = {
  children: (props: { gesture: Coordinate[] }) => ReactNode;
  pointDistance: number;
  onCapture: () => void;
  onPanRelease: () => void;
};

const GestureCapture = ({ children, onCapture, onPanRelease, pointDistance }: Props) => {
  const { reset, addBreadcrumbToPath, setCoordinate, path } = useGestureStore();
  const { gesture } = useRecorder({ path, pointDistance, onCapture });

  return (
    <PanGestureHandler
      onGestureEvent={({ nativeEvent }: { nativeEvent: PanGestureHandlerEventExtra }) => {
        addBreadcrumbToPath(nativeEvent);
        setCoordinate({ x: nativeEvent.x, y: nativeEvent.y });
      }}
      onHandlerStateChange={({ nativeEvent }: { nativeEvent: PanGestureHandlerEventExtra }) => {
        if (nativeEvent.state === State.END) {
          reset();
          onPanRelease();
        }
      }}
    >
      {children({ gesture })}
    </PanGestureHandler>
  );
};

GestureCapture.defaultProps = {
  pointDistance: 20,
  onCapture: () => {},
  onPanRelease: () => {},
};

export default GestureCapture;
