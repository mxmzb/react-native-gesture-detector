import React from "react";
import { Animated, ViewStyle } from "react-native";

interface Coordinate {
  x: number;
  y: number;
}

type GesturePathProps = {
  path: Coordinate[];
  color: string;
  slopRadius: number;
  center: boolean;
};

const GesturePath = ({ path, color, slopRadius, center = true }: GesturePathProps) => {
  const baseStyle: ViewStyle = {
    position: "absolute",
    top: center ? "50%" : 0,
    left: center ? "50%" : 0,
    opacity: 0.4,
  };

  return (
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
};

GesturePath.defaultProps = {
  path: [],
  slopRadius: 50,
  color: "black",
};

export default GesturePath;
