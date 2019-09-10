import { useEffect, useState } from "react";

import { Coordinate, Direction } from "./Types";

type Props = {
  pointDistance: number;
  path: Coordinate[];
  onCapture: (progress: number) => void;
};

// point and coordinate are essentially interface. the difference is merely,
// that i find "point" more clear for the outside user (e.g. "pointDistance" sounds
// clearer imho than "coordinateDistance"), while coordinate is just an internal
// variable name
const useRecorder = ({ path, pointDistance, onCapture }: Props) => {
  const [currentDirection, setCurrentDirection] = useState<Direction | null>(null);
  const [pathIndex, setPathIndex] = useState<number>(0);
  const [gesture, setGesture] = useState<Coordinate[]>([]);

  useEffect(() => {
    if (pathIndex < path.length - 1) {
      if (JSON.stringify(path[pathIndex]) !== JSON.stringify(path[pathIndex + 1])) {
        if (gesture.length === 0) {
          setGesture([{ x: path[0].x, y: path[0].y }]);
        } else {
          const tmpNextGesturePoint = getNextGesturePoint({
            prevGesturePoint: gesture[gesture.length - 1],
            pathCoordinate: path[pathIndex],
            desiredDistance: pointDistance,
          });

          // console.log("path", path);
          // console.log("gesture", gesture);
          // console.log("pathIndex", pathIndex);
          setCurrentDirection(calculateDirection({ a: path[pathIndex], b: path[pathIndex + 1] }));
          setGesture(state => [...state, tmpNextGesturePoint]);
        }
      }
      setPathIndex(state => state + 1);
    }
  }, [gesture, path, pointDistance, pathIndex]);

  const calculateDirection = ({ a, b }: { a: Coordinate; b: Coordinate }): Direction => {
    let x = null,
      y = null;

    if (a.x < b.x) {
      x = "right";
    }

    if (a.x > b.x) {
      x = "left";
    }

    if (a.y < b.y) {
      y = "down";
    }

    if (a.y > b.y) {
      y = "up";
    }

    return {
      x: x as Direction["x"],
      y: y as Direction["y"],
    };
  };

  const directionHasChanged = (currentDirection: Direction, nextDirection: Direction) =>
    JSON.stringify(currentDirection) !== JSON.stringify(nextDirection);

  const calculateDistance = ({ a, b }: { a: Coordinate; b: Coordinate }) => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  };

  const calculateDistanceFactor = ({
    a,
    b,
    desiredDistance,
  }: {
    a: Coordinate;
    b: Coordinate;
    desiredDistance: number;
  }) => {
    return desiredDistance / calculateDistance({ a, b });
  };

  const getNextGesturePoint = ({
    prevGesturePoint,
    pathCoordinate,
    desiredDistance,
  }: {
    prevGesturePoint: Coordinate;
    pathCoordinate: Coordinate;
    desiredDistance: number;
  }) => {
    const distanceFactor = calculateDistanceFactor({
      a: prevGesturePoint,
      b: pathCoordinate,
      desiredDistance,
    });

    return {
      x: prevGesturePoint.x + (pathCoordinate.x - prevGesturePoint.x) * distanceFactor,
      y: prevGesturePoint.y + (pathCoordinate.y - prevGesturePoint.y) * distanceFactor,
    };
  };

  return {
    gesture,
    currentDirection,
  };
};

export default useRecorder;
