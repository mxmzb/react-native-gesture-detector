import React from "react";
import { View } from "react-native";

// const Breadcrumb = styled.View`
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   margin-top: ${props => props.y - props.radius};
//   margin-left: ${props => props.x - props.radius};
//   width: ${props => props.radius * 2};
//   height: ${props => props.radius * 2};
//   border-radius: ${props => props.radius};
//   background: ${props => props.color};
//   opacity: 0.4;
// `;

type GesturePathProps = {
  path: any;
  color: any;
  slopRadius: any;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  opacity: 0.4,
};

const GesturePath = ({ path, color, slopRadius }: GesturePathProps) => (
  <>
    {path.map((point, index) => (
      <View />
      // <View style={style} x={point.x} y={point.y} key={index} radius={slopRadius} color={color} />
    ))}
  </>
);

GesturePath.defaultProps = {
  path: [],
  slopRadius: 50,
  color: "black",
};

export default GesturePath;
