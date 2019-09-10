import React, { ReactNode } from "react";
// @ts-ignore or we will break expo example
import { PanGestureHandler, State } from "react-native-gesture-handler";

import useDetector from "./useDetector";
import useGestureStore from "./useGestureStore";

import { PanGestureHandlerEventExtra, GestureDetectorsInterface, Coordinate } from "./Types";

type Props = {
  children: (props: { coordinate: Coordinate | null }) => ReactNode;
  slopRadius: number;
  gestures: { [key: string]: Coordinate[] };
  onProgress: (args: { progress: number; gesture: string }) => void;
  onGestureFinish: (gestureKey: string) => void;
  onPanRelease: () => void;
};

const GestureDetector = ({
  children,
  slopRadius,
  gestures,
  onProgress,
  onGestureFinish,
  onPanRelease,
}: Props) => {
  const {
    reset: resetStore,
    addBreadcrumbToPath,
    coordinate,
    setCoordinate,
    path,
  } = useGestureStore();
  const detectors: GestureDetectorsInterface = {};
  const gestureKeys: string[] = Object.keys(gestures);

  for (let i = 0; i < gestureKeys.length; i++) {
    const gestureKey = gestureKeys[i];

    const { reset: resetDetector } = useDetector({
      slopRadius,
      path,
      gesture: gestures[gestureKey],
      onProgress: progress => {
        onProgress({ gesture: gestureKeys[i], progress });
      },
      onGestureFinish: () => {
        onGestureFinish(gestureKeys[i]);
      },
    });

    detectors[gestureKey] = {
      reset: resetDetector,
    };
  }

  const reset = () => {
    resetStore();
    for (let i = 0; i < gestureKeys.length; i++) {
      const gestureKey = gestureKeys[i];
      detectors[gestureKey].reset();
    }
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
          onPanRelease();
        }
      }}
    >
      {children({ coordinate })}
    </PanGestureHandler>
  );
};

GestureDetector.defaultProps = {
  gestures: {},
  slopRadius: 50,
  onProgress: () => {},
  onGestureFinish: () => {},
  onPanRelease: () => {},
};

export default GestureDetector;
