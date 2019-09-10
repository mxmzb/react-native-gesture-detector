import { useState, useEffect } from "react";
// @ts-ignore or we will break expo example

import { Coordinate, PanGestureHandlerEventExtra } from "./Types";

const useGestureStore = () => {
  const [coordinate, setCoordinate] = useState<Coordinate | null>(null);
  const [startCoordinate, setStartCoordinate] = useState<Coordinate | null>(null);
  const [path, setPath] = useState<Coordinate[]>([]);

  const reset = () => {
    setCoordinate(null);
    setStartCoordinate(null);
    setPath([]);
  };

  const addBreadcrumbToPath = ({ x, y }: PanGestureHandlerEventExtra) => {
    if (!startCoordinate) {
      setStartCoordinate({ x, y });
      setPath([{ x: 0, y: 0 }]);
    } else {
      const normalizedCoordinate = normalizeCoordinate({ x, y });
      if (normalizedCoordinate) {
        setPath(state => [...state, normalizedCoordinate]);
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

  return {
    path,
    coordinate,
    addBreadcrumbToPath,
    setCoordinate,
    reset,
  };
};

export default useGestureStore;
