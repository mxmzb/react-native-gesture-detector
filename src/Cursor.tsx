import React, { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import _ from "lodash";

type CursorProps = {
  x: number;
  y: number;
  throttleMs: number;
};

const baseStyle = {
  position: "absolute",
  width: 30,
  height: 30,
  marginLeft: -15,
  marginTop: -15,
  borderRadius: 15,
  backgroundColor: "#555",
  borderWidth: 1,
  borderColor: "#000",
  zIndex: 999,
};

const Cursor = ({ x, y, throttleMs }: CursorProps) => {
  const [translateX] = useState(new Animated.Value(x));
  const [translateY] = useState(new Animated.Value(y));

  const throttledSetCoordinate = useRef(
    _.throttle(({ x, y }: { x: number; y: number }) => {
      translateX.setValue(x);
      translateY.setValue(y);
    }, throttleMs),
  );

  useEffect(() => throttledSetCoordinate.current({ x, y }), [x, y]);

  return (
    <Animated.View
      style={Object.assign({}, baseStyle, {
        transform: [
          {
            translateX,
          },
          {
            translateY,
          },
        ],
      })}
    />
  );
};

Cursor.defaultProps = {
  x: 0,
  y: 0,
  throttleMs: __DEV__ ? 50 : 25,
};

export default Cursor;
