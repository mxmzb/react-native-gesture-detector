import React from "react";
import { Animated, ViewStyle } from "react-native";

interface Coordinate {
  x: number;
  y: number;
}

type GesturePathProps = {
  path: [Coordinate];
  color: string;
  slopRadius: number;
};

const baseStyle: ViewStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  opacity: 0.4,
};

const GesturePath = ({ path, color, slopRadius }: GesturePathProps) => (
  <>
    {path.map((point, index) => (
      <Animated.View
        style={Object.assign({}, baseStyle, {
          width: slopRadius * 2,
          height: slopRadius * 2,
          borderRadius: slopRadius,
          backgroundColor: color,
          marginLeft: point.x - slopRadius,
          marginTop: point.y - slopRadius,
        })}
        key={index}
      />
    ))}
  </>
);

GesturePath.defaultProps = {
  path: [],
  slopRadius: 50,
  color: "black",
};

export default GesturePath;
