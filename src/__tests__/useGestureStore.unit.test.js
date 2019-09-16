import React from "react";
import { Animated } from "react-native";
import { mount } from "enzyme";

import GesturePath from "../GesturePath";

describe("<GesturePath />", () => {
  it("renders 3 coordinate points", () => {
    const wrapper = mount(
      <GesturePath path={[{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 20, y: 0 }]} />,
    );
    expect(wrapper.find(Animated.View)).toHaveLength(3);
  });
});
