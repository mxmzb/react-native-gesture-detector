<p align="center">
  <h1 align="center">React Native Gesture Detector</h1>
  <h3 align="center">Create and detect custom gestures on React Native.</h3>
</p>

[![Version](https://img.shields.io/npm/v/react-native-gesture-detector)](https://github.com/mxmzb/react-native-gesture-detector)
[![License](https://img.shields.io/npm/l/react-native-gesture-detector)](https://npmjs.org/package/react-native-gesture-detector)

## Demos

<img src="/mxmzb/react-native-gesture-detector/raw/master/example/assets/demo-coil.gif" alt="" style="max-width: 320px;">
<img src="/mxmzb/react-native-gesture-detector/raw/master/example/assets/demo-multiple-gestures.gif" alt="" style="max-width: 320px;">
<img src="/mxmzb/react-native-gesture-detector/raw/master/example/assets/demo-triangle.gif" alt="" style="max-width: 320px;">

### Example app

Feel free to run the included Expo app:

```sh
$ git clone https://github.com/mxmzb/react-native-gesture-detector.git
$ cd react-native-gesture-detector/example
$ yarn
$ yarn start
```

## Intro

This package originated from a real life need to detect custom gestures. The idea for implementation originated from this [stellar answer](https://stackoverflow.com/questions/20821358/gesture-detection-algorithm-based-on-discrete-points) on StackOverflow. The result is not 100% foolproof, but performant and extremely simple to use.

Because the library strongly uses React hooks, you must use at least `react@16.8.0`.

## Installation

```sh
$ yarn add react-native-gesture-detector
$ yarn add react-native-gesture-handler lodash # install peer dependencies
```

## Quickstart

```jsx
import GestureDetector, { GesturePath, Cursor } from "react-native-gesture-detector";

const gestures = {
  Coil: [
    { x: 10, y: -30 },
    { x: 25, y: -15 },
    { x: 40, y: -10 },
    { x: 55, y: -15 },
    { x: 70, y: -30 },
    { x: 85, y: -45 },
    { x: 90, y: -65 },
    { x: 85, y: -85 },
    { x: 70, y: -100 },
    { x: 55, y: -115 },
    { x: 40, y: -130 },
    { x: 20, y: -130 },
    { x: 0, y: -130 },
    { x: -20, y: -130 },
    { x: -35, y: -115 },
    { x: -50, y: -100 },
    { x: -65, y: -85 },
    { x: -80, y: -70 },
    { x: -80, y: -55 },
    { x: -80, y: -30 },
    { x: -80, y: -15 },
    { x: -80, y: 0 },
    { x: -65, y: 15 },
    { x: -50, y: 30 },
    { x: -35, y: 45 },
    { x: -20, y: 60 },
    { x: 0, y: 65 },
    { x: 20, y: 70 },
    { x: 40, y: 70 },
  ],
};

const CoilExample = () => (
  <GestureDetector
    onGestureFinish={gesture => console.log(`Gesture "${gesture}" finished!`)}
    onProgress={({ gesture, progress }) => {
      console.log(`Gesture: ${gesture}, progress: ${progress}`);
    }}
    onPanRelease={() => {
      console.log("User released finger!");
    }}
    gestures={gestures}
    slopRadius={35}
  >
    {({ coordinate }) => (
      <View style={{ position: "relative", width: "100%", height: "100%" }}>
        <GesturePath path={gestures["Coil"]} color="green" slopRadius={35} />
        {coordinate && <Cursor {...coordinate} />}
      </View>
    )}
  </GestureDetector>
);
```

## Documentation and API

#### `GestureDetector`

`GestureDetector` is a render props component. The child function has the form `children({ coordinate: { x: number, y: number } })`

| Prop         | Default |   Type   |                                                Description                                                 |
| :----------- | :-----: | :------: | :--------------------------------------------------------------------------------------------------------: |
| `slopRadius` |   50    | `number` | The radius in px from a coordinate. The resulting circle is the area in which the user can move the finger |

#### `GesturePath`

#### `Cursor`

## Roadmap

- [ ] Create a logo
- [ ] Write some tests
- [ ] Make one more cool example
- [ ] Create a component, that will create gesture coordinates from your gesture

## License

`react-native-gesture-detector` is licensed under the [MIT](https://github.com/mxmzb/react-native-gesture-detector/blob/master/LICENSE).
