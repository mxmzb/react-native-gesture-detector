import { useState, useEffect } from "react";

import { Coordinate } from "./Types";

type Props = {
  path: Coordinate[];
  slopRadius: number;
  gesture: Coordinate[];
  onProgress: (progress: number) => void;
  onGestureFinish: () => void;
};

const useDetector = ({ gesture, path, slopRadius, onProgress, onGestureFinish }: Props) => {
  const [currentPathCoordinateIndex, setCurrentPathCoordinateIndex] = useState<number>(0);
  const [matchedGestureCoordinates, setMatchedGestureCoordinates] = useState<number>(0);

  useEffect(() => compute(), [
    gesture,
    path,
    currentPathCoordinateIndex,
    matchedGestureCoordinates,
    slopRadius,
    onProgress,
    onGestureFinish,
  ]);

  const reset = () => {
    setCurrentPathCoordinateIndex(0);
    setMatchedGestureCoordinates(0);
  };

  const compute = () => {
    if (
      currentPathCoordinateIndex < path.length - 1 &&
      matchedGestureCoordinates < gesture.length
    ) {
      if (
        coordinateIsInRange({
          gestureCoordinate: gesture[matchedGestureCoordinates],
          candidateCoordinate: path[currentPathCoordinateIndex],
          radius: slopRadius,
        })
      ) {
        onProgress((matchedGestureCoordinates + 1) / gesture.length);

        if (matchedGestureCoordinates + 1 === gesture.length) {
          onGestureFinish();
        }

        setMatchedGestureCoordinates(state => state + 1);
      }

      setCurrentPathCoordinateIndex(state => state + 1);
    }
  };

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

  return {
    reset,
  };
};

export default useDetector;
