import React, { useState, useEffect, ReactNode, SyntheticEvent } from "react";
// @ts-ignore or we will break expo example
import { PanGestureHandler, State } from "react-native-gesture-handler";

interface PanGestureHandlerEventExtra {
  state: State;
  x: number;
  y: number;
  absoluteX: number;
  absoluteY: number;
  translationX: number;
  translationY: number;
  velocityX: number;
  velocityY: number;
}

interface Coordinate {
  x: number;
  y: number;
}

type GestureDetectorProps = {
  children: (props: { coordinate: Coordinate | null }) => ReactNode;
  slopRadius: number;
  gestures: { [key: string]: [Coordinate] };
  onProgress: (args: { progress: number; gesture: string }) => void;
  onGestureFinish: (gestureKey: string) => void;
  onPanRelease: () => void;
};

interface GestureCoordinatesTrackingInterface {
  [s: string]: number;
}

const GestureDetector = ({
  children,
  slopRadius,
  gestures,
  onProgress,
  onGestureFinish,
  onPanRelease,
}: GestureDetectorProps) => {
  const gesturesArr: string[] = Object.keys(gestures);

  const initMatchedGestureCoordinates = () => {
    const obj: GestureCoordinatesTrackingInterface = {};
    for (let i = 0; i < gesturesArr.length; i++) {
      obj[gesturesArr[i]] = 0;
    }
    return obj;
  };

  // difference between useState<Coordinate[]> and useState<[Coordinate?]> ?
  const [coordinate, setCoordinate] = useState<Coordinate | null>(null);
  const [startCoordinate, setStartCoordinate] = useState<Coordinate | null>(null);
  const [path, setPath] = useState<Coordinate[]>([]);
  const [matchedGestureCoordinates, setMatchedGestureCoordinates] = useState(
    initMatchedGestureCoordinates(),
  );
  const [currentPathCoordinateIndex, setCurrentPathCoordinateIndex] = useState(0);

  const reset = () => {
    setCoordinate(null);
    setStartCoordinate(null);
    setPath([]);
    setMatchedGestureCoordinates(initMatchedGestureCoordinates());
    setCurrentPathCoordinateIndex(0);
  };

  const addBreadcrumbToPath = ({ x, y }: PanGestureHandlerEventExtra) => {
    if (!startCoordinate) {
      setStartCoordinate({ x, y });
      setPath([{ x: 0, y: 0 }]);
    } else {
      const normalizedCoordinate = normalizeCoordinate({ x, y });
      if (normalizedCoordinate) {
        setPath([...path, normalizedCoordinate]);
      }
    }
  };

  const normalizeCoordinate = ({ x, y }: { x: number; y: number }) =>
    startCoordinate
      ? {
          x: x - startCoordinate.x,
          y: y - startCoordinate.y,
        }
      : null;

  const coordinateIsInRange = ({
    gestureCoordinate,
    candidateCoordinate,
    radius,
  }: {
    gestureCoordinate: Coordinate;
    candidateCoordinate: Coordinate;
    radius: number;
  }) =>
    Math.pow(candidateCoordinate.x - gestureCoordinate.x, 2) +
      Math.pow(candidateCoordinate.y - gestureCoordinate.y, 2) <
    Math.pow(radius, 2);

  const compute = () => {
    if (currentPathCoordinateIndex < path.length - 1) {
      for (let i = 0; i < gesturesArr.length; i++) {
        const gestureKey = gesturesArr[i];
        const gesture = gestures[gestureKey];

        if (matchedGestureCoordinates[gestureKey] < gesture.length) {
          if (
            coordinateIsInRange({
              gestureCoordinate: gesture[matchedGestureCoordinates[gestureKey]],
              candidateCoordinate: path[currentPathCoordinateIndex],
              radius: slopRadius,
            })
          ) {
            onProgress({
              progress: (matchedGestureCoordinates[gestureKey] + 1) / gesture.length,
              gesture: gestureKey,
            });

            if (matchedGestureCoordinates[gestureKey] + 1 === gesture.length) {
              onGestureFinish(gestureKey);
            }

            setMatchedGestureCoordinates(
              Object.assign({}, matchedGestureCoordinates, {
                [gestureKey]: matchedGestureCoordinates[gestureKey] + 1,
              }),
            );
          }
        }
      }
      setCurrentPathCoordinateIndex(currentPathCoordinateIndex + 1);
    }
  };

  useEffect(() => compute(), [
    path,
    currentPathCoordinateIndex,
    gesturesArr,
    matchedGestureCoordinates,
    gestures,
    slopRadius,
    onProgress,
    onGestureFinish,
  ]);

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
