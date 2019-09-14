import { useEffect, useState } from "react";

import { Coordinate, Direction } from "./Types";

type Props = {
  pointDistance: number;
  path: Coordinate[];
  onCapture: () => void;
};

// point and coordinate are essentially interface. the difference is merely,
// that i find "point" more clear for the outside user (e.g. "pointDistance" sounds
// clearer imho than "coordinateDistance"), while coordinate is just an internal
// variable name
const useRecorder = ({ path, pointDistance, onCapture }: Props) => {
  const [pathIndex, setPathIndex] = useState<number>(0);
  const [gesture, setGesture] = useState<Coordinate[]>([]);
  // first element is null, as we don't have a direction with only one coordinate
  const [gestureDirectionHistory, setGestureDirectionHistory] = useState<Direction[]>([
    { x: null, y: null },
  ]);

  useEffect(() => {
    if (pathIndex < path.length - 1) {
      if (JSON.stringify(path[pathIndex]) !== JSON.stringify(path[pathIndex + 1])) {
        if (gesture.length === 0) {
          setGesture([{ x: path[0].x, y: path[0].y }]);
        } else {
          if (calculateDistance(gesture[gesture.length - 1], path[pathIndex]) >= pointDistance) {
            const nextDirection = calculateDirection(gesture[gesture.length - 1], path[pathIndex]);
            setGestureDirectionHistory(state => [...state, nextDirection]);
            setGesture(state => [...state, path[pathIndex]]);
            onCapture();
          }
        }
      }
      setPathIndex(state => state + 1);
    }
  }, [gesture, path, pointDistance, pathIndex]);

  const reset = () => {
    setPathIndex(0);
    setGesture([]);
    setGestureDirectionHistory([{ x: null, y: null }]);
  };

  const calculateDirection = (pointA: Coordinate, pointB: Coordinate): Direction => {
    let x = null,
      y = null;

    if (pointA.x < pointB.x) {
      x = "right";
    }

    if (pointA.x > pointB.x) {
      x = "left";
    }

    if (pointA.y < pointB.y) {
      y = "down";
    }

    if (pointA.y > pointB.y) {
      y = "up";
    }

    return {
      x: x as Direction["x"],
      y: y as Direction["y"],
    };
  };

  // possibly for future computation
  const directionHasChanged = (currentDirection: Direction, nextDirection: Direction) =>
    JSON.stringify(currentDirection) !== JSON.stringify(nextDirection);

  const calculateDistance = (pointA: Coordinate, pointB: Coordinate) => {
    return Math.sqrt(Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2));
  };

  return {
    gesture,
    gestureDirectionHistory,
    reset,
  };
};

export default useRecorder;
