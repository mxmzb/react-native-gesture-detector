import { ReactNode } from "react";
// @ts-ignore or we will break expo example
import { State } from "react-native-gesture-handler";

export interface PanGestureHandlerEventExtra {
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

export interface Coordinate {
  x: number;
  y: number;
}

export interface Direction {
  x: "left" | "right" | null;
  y: "up" | "down" | null;
}

export interface Detector {
  reset: () => void;
}

export interface GestureDetectorsInterface {
  [key: string]: Detector;
}
