import React, { useState, useEffect, ReactNode } from "react";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import _ from "lodash";

interface Coordinate {
  x: number;
  y: number;
}

type GestureDetectorProps = {
  children: (props: { coordinate: Coordinate }) => ReactNode;
  slopRadius: number;
  gestures: [Coordinate];
  onProgress: any;
  onGestureFinish: any;
  onPanRelease: any;
  throttleMs: any;
};

const GestureDetector = ({
  children,
  slopRadius,
  gestures,
  onProgress,
  onGestureFinish,
  onPanRelease,
  throttleMs,
}: GestureDetectorProps) => {
  const gesturesArr = Object.keys(gestures);

  const initMatchedGestureCoordinates = () => {
    const obj = {};
    for (let i = 0; i < gesturesArr.length; i++) {
      obj[gesturesArr[i]] = 0;
    }
    return obj;
  };

  const [coordinate, setCoordinate] = useState(null);
  const [startCoordinate, setStartCoordinate] = useState(null);
  const [path, setPath] = useState([]);
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

  const addBreadcrumbToPath = ({ x, y }) => {
    if (!startCoordinate) {
      setStartCoordinate({ x, y });
      setPath([{ x: 0, y: 0 }]);
    } else {
      setPath([...path, normalizeCoordinate({ x, y })]);
    }
  };

  const normalizeCoordinate = ({ x, y }) => ({
    x: x - startCoordinate.x,
    y: y - startCoordinate.y,
  });

  const coordinateIsInRange = ({ gestureCoordinate, candidateCoordinate, radius }) =>
    Math.pow(candidateCoordinate.x - gestureCoordinate.x, 2) +
      Math.pow(candidateCoordinate.y - gestureCoordinate.y, 2) <
    Math.pow(radius, 2);
  // Math.pow(radius / 2, 2);

  useEffect(() => {
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

            if (matchedGestureCoordinates[gestureKey] === gesture.length - 2) {
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
  }, [
    path,
    currentPathCoordinateIndex,
    gesturesArr,
    matchedGestureCoordinates,
    gestures,
    slopRadius,
    onProgress,
    onGestureFinish,
  ]);

  const throttledOnGestureEventHandler = _.throttle(({ nativeEvent }) => {
    setCoordinate({ x: nativeEvent.absoluteX, y: nativeEvent.absoluteY });
    addBreadcrumbToPath(nativeEvent);
  }, throttleMs);

  return (
    <PanGestureHandler
      onGestureEvent={event => {
        throttledOnGestureEventHandler({ nativeEvent: event.nativeEvent });
      }}
      onHandlerStateChange={({ nativeEvent }) => {
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
  gestures: [],
  slopRadius: 50,
  throttleMs: 500,
  onProgress: () => {},
  onGestureFinish: () => {},
  onPanRelease: () => {},
};

export default GestureDetector;
